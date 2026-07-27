import type { APIRoute } from 'astro';
import { locales } from '../i18n/locales';
import { canonicalUrl, withBase } from '../lib/url';

/**
 * Generated at build time rather than kept as a static file, so both lastmod and
 * the URL track the current deploy instead of drifting. One <url> per locale's
 * home page, each carrying an <xhtml:link> to every locale (including itself)
 * plus x-default — the standard way to tell crawlers the pages are
 * translations of each other rather than duplicate content.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? 'https://elliottjones.net';
  const lastmod = new Date().toISOString().slice(0, 10);

  const pages = locales.map((locale) => ({
    locale,
    href: canonicalUrl(withBase(locale.path), origin).href,
  }));

  const alternateLinks = (currentHref: string) =>
    pages
      .map(
        (page) =>
          `    <xhtml:link rel="alternate" hreflang="${page.locale.hreflang}" href="${page.href}"/>`,
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pages.find((p) => p.locale.code === 'en')?.href ?? currentHref}"/>`,
      )
      .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
    .map(
      (page) => `  <url>
    <loc>${page.href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${alternateLinks(page.href)}
  </url>`,
    )
    .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
