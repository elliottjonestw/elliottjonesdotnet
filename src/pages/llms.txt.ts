import type { APIRoute } from 'astro';
import { getContent } from '../data/content';
import { locales } from '../i18n/locales';
import { canonicalUrl, withBase } from '../lib/url';
import { getAllPosts, indexRoute, postRoute } from '../lib/blog';

/**
 * Generated at build time rather than kept as a static file, so a new post
 * lands here the same build it lands in the sitemap — same pattern as
 * sitemap.xml.ts.
 *
 * The format follows the llmstxt.org proposal: an H1 site name (the only
 * required section), a blockquote summary, optional plain sections, then H2
 * sections whose bodies are markdown lists of "[name](url): note" links.
 * One section per locale, so a reader can tell the two languages apart
 * without fetching anything.
 */

/** Brackets in a title or excerpt would break the link syntax this file is built from. */
const escapeMarkdown = (text: string) => text.replace(/[[\]]/g, '\\$&');

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? 'https://elliottjones.net';
  const href = (path: string) => canonicalUrl(withBase(path), origin).href;

  const { person } = getContent('en');
  const posts = await getAllPosts();

  const sections = locales.map((locale) => {
    const items = [
      `- [Blog index (${locale.name})](${href(indexRoute(locale.code))})`,
      ...posts
        .filter((post) => post.locale === locale.code)
        .map(
          (post) =>
            `- [${escapeMarkdown(post.post.data.title)}](${href(postRoute(post.locale, post.slug))}): ${escapeMarkdown(post.excerpt)}`,
        ),
    ];
    return `## Blog (${locale.name})\n\n${items.join('\n')}`;
  });

  const body = `# ${person.name}

> ${person.metaDescription}

Personal site and blog of Elliott Jones, published in English and Traditional Chinese (zh-tw).

${sections.join('\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
