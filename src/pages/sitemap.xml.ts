import type { APIRoute } from 'astro';
import { locales, type LocaleCode } from '../i18n/locales';
import { profileModified } from '../data/profile-metadata';
import { canonicalUrl, withBase } from '../lib/url';
import {
  effectiveModifiedDate,
  getAllPosts,
  indexRoute,
  postRoute,
} from '../lib/blog';

/**
 * Generated at build time so the URLs and content-based modification dates stay
 * in sync. Static-page dates come from deliberately maintained source data,
 * never from the current deployment.
 *
 * Every entry carries an <xhtml:link> to each locale's copy of the same page
 * (including itself) plus x-default — the standard way to tell crawlers the
 * pages are translations of each other rather than duplicate content. For a
 * post, "the same page" is the translation with the same slug; a post that
 * exists in one language only points its other alternate at that language's
 * blog index rather than at a URL that was never built.
 */

interface Entry {
  /** Route without the base prefix, per locale. */
  paths: Record<LocaleCode, string>;
  locale: LocaleCode;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? 'https://elliottjones.net';

  const homePaths = Object.fromEntries(
    locales.map((locale) => [locale.code, locale.path]),
  ) as Record<LocaleCode, string>;

  const indexPaths = Object.fromEntries(
    locales.map((locale) => [locale.code, indexRoute(locale.code)]),
  ) as Record<LocaleCode, string>;

  const posts = await getAllPosts();
  const newestPostModifiedByLocale = new Map<LocaleCode, string>();
  for (const post of posts) {
    const modified = effectiveModifiedDate(post);
    const current = newestPostModifiedByLocale.get(post.locale);
    if (!current || modified > current) {
      newestPostModifiedByLocale.set(post.locale, modified);
    }
  }

  /** Which locales each slug was actually written in. */
  const written = new Map<string, Set<LocaleCode>>();
  for (const post of posts) {
    const set = written.get(post.slug) ?? new Set<LocaleCode>();
    set.add(post.locale);
    written.set(post.slug, set);
  }

  const entries: Entry[] = [
    ...locales.map((locale) => ({
      paths: homePaths,
      locale: locale.code,
      lastmod: profileModified[locale.code],
      changefreq: 'monthly',
      priority: '1.0',
    })),
    ...locales.map((locale) => ({
      paths: indexPaths,
      locale: locale.code,
      lastmod: newestPostModifiedByLocale.get(locale.code) ?? profileModified[locale.code],
      changefreq: 'weekly',
      priority: '0.7',
    })),
    ...posts.map((post) => ({
      paths: Object.fromEntries(
        locales.map((locale) => [
          locale.code,
          written.get(post.slug)?.has(locale.code)
            ? postRoute(locale.code, post.slug)
            : indexPaths[locale.code],
        ]),
      ) as Record<LocaleCode, string>,
      locale: post.locale,
      lastmod: effectiveModifiedDate(post),
      changefreq: 'yearly',
      priority: '0.6',
    })),
  ];

  const href = (path: string) => canonicalUrl(withBase(path), origin).href;

  const alternateLinks = (entry: Entry) =>
    locales
      .map(
        (locale) =>
          `    <xhtml:link rel="alternate" hreflang="${locale.hreflang}" href="${href(entry.paths[locale.code])}"/>`,
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${href(entry.paths.en)}"/>`,
      )
      .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
    .map(
      (entry) => `  <url>
    <loc>${href(entry.paths[entry.locale])}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${alternateLinks(entry)}
  </url>`,
    )
    .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
