/**
 * Everything the blog pages need on top of the raw content collection.
 *
 * The collection stores one flat list of entries whose ids carry the locale as
 * a folder prefix — "en/getting-started", "zh-tw/getting-started". This module
 * is the only place that knows that, so pages ask for "the English posts" and
 * get them back already sorted, excerpted and timed.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { LocaleCode } from '../i18n/locales';
import { getContent } from '../data/content';
import { canonicalUrl, withBase } from './url';

export type Post = CollectionEntry<'blog'>;

/** A post with the derived values every listing needs, computed once. */
export interface PostSummary {
  post: Post;
  /** The id with its locale folder removed: "getting-started". */
  slug: string;
  locale: LocaleCode;
  /** Site path, base-prefixed and ready for an href. */
  href: string;
  /** First paragraph of the rendered body. */
  excerpt: string;
  /** Whole minutes, never less than one. */
  minutes: number;
  /** Localised, e.g. "15 January 2025" or "2025年1月15日". */
  dateLabel: string;
  /** yyyy-mm-dd, for <time datetime> and article:published_time. */
  dateISO: string;
  cover?: { image: ImageMetadata; alt: string };
}

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

/** The folder name each locale's posts live in, under src/content/blog. */
const folders: Record<LocaleCode, string> = {
  en: 'en',
  'zh-Hant-TW': 'zh-tw',
};

/**
 * Every image under src/assets/blog, keyed by its path below that directory —
 * so frontmatter can say "getting-started/cover.jpg" and never carry a chain
 * of ../ relative to wherever the markdown file happens to sit. Eager, because
 * the covers are needed synchronously while a page's frontmatter runs.
 */
const covers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/blog/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/** "getting-started/cover.jpg" → the processed ImageMetadata for that file. */
export function resolveCover(src: string): ImageMetadata {
  const key = `/src/assets/blog/${src.replace(/^\/+/, '')}`;
  const found = covers[key];
  if (!found) {
    throw new Error(
      `Blog cover "${src}" not found. Expected a file at src/assets/blog/${src}.`,
    );
  }
  return found.default;
}

/** Locale of a collection entry, read off its id's folder prefix. */
export function localeOf(post: Post): LocaleCode {
  return post.id.startsWith('zh-tw/') ? 'zh-Hant-TW' : 'en';
}

/** The id with its locale folder removed — the last URL segment of the post. */
export function slugOf(post: Post): string {
  return post.id.slice(post.id.indexOf('/') + 1);
}

/**
 * Routes come in two forms. The `…Route` pair is the path as the site knows
 * it, which is what hreflang alternates, the language switch and the sitemap
 * want; the `…Path` pair is the same thing with the deploy's base prefix on
 * the front, which is what an href wants.
 */

/** A locale's blog index, without the base prefix. */
export function indexRoute(locale: LocaleCode): string {
  return locale === 'zh-Hant-TW' ? 'zh-tw/blog' : 'blog';
}

/** One post, without the base prefix. */
export function postRoute(locale: LocaleCode, slug: string): string {
  return `${indexRoute(locale)}/${slug}`;
}

/** Base-prefixed path to a locale's blog index. */
export function listPath(locale: LocaleCode): string {
  return withBase(indexRoute(locale));
}

/** Base-prefixed path to one post. */
export function postPath(locale: LocaleCode, slug: string): string {
  return withBase(postRoute(locale, slug));
}

const entities: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  '#39': "'",
  nbsp: ' ',
};

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&(#39|amp|lt|gt|quot|nbsp);/g, (_, name) => entities[name] ?? _)
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The post's opening paragraph, used as the listing excerpt, the card blurb and
 * the meta description. Taken from the rendered HTML rather than a frontmatter
 * field, so there is only one copy of the sentence and it cannot fall out of
 * step with the post.
 *
 * The markdown body is the fallback for the case where the loader has not
 * rendered the entry — the first block that is not a heading, a fence, an
 * image or a quote.
 */
export function getExcerpt(post: Post): string {
  // Opening callouts, such as a legal disclaimer, are supporting context rather
  // than the article's description. Remove the whole aside so neither its label
  // nor its body becomes the first paragraph shown on the all-posts page.
  const html = post.rendered?.html.replace(/<aside\b[\s\S]*?<\/aside>/gi, '');
  // The [TOC] marker renders its own <p> title inside the contents box; a
  // post that opens with [TOC] must not have "Contents" as its excerpt.
  const first = html?.match(
    /<p\b(?![^>]*class="post-toc-title")[^>]*>([\s\S]*?)<\/p>/i,
  );
  if (first) return stripTags(first[1]);

  const body = (post.body ?? '').replace(/```[\s\S]*?```/g, '');
  const block = body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .find(
      (part) =>
        part && !/^([#>\-*|!]|\d+\.)/.test(part) && !/^\[toc\]$/i.test(part),
    );
  return block ? stripTags(block).replace(/[*_`]/g, '') : '';
}

/**
 * Reading time in whole minutes.
 *
 * Two counts, because the two languages are not measured in the same unit: a
 * word for English at 200 wpm, a character for Chinese at 300 cpm. Counting
 * "words" in Chinese would give a handful of whitespace-delimited runs and a
 * one-minute estimate for every post.
 */
export function readingTime(post: Post, locale: LocaleCode): number {
  const text = (post.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ');

  if (locale === 'zh-Hant-TW') {
    const han = text.match(/[㐀-鿿豈-﫿]/g)?.length ?? 0;
    const latin = text.match(/[A-Za-z]+/g)?.length ?? 0;
    return Math.max(1, Math.round(han / 300 + latin / 200));
  }

  const words = text.match(/\S+/g)?.length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

/** yyyy-mm-dd. Read in UTC so a date never slips a day on a machine behind it. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatDate(date: Date, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(
    locale === 'zh-Hant-TW' ? 'zh-Hant-TW' : 'en-GB',
    { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' },
  ).format(date);
}

function summarise(post: Post): PostSummary {
  const locale = localeOf(post);
  const slug = slugOf(post);
  return {
    post,
    slug,
    locale,
    href: postPath(locale, slug),
    excerpt: getExcerpt(post),
    minutes: readingTime(post, locale),
    dateLabel: formatDate(post.data.date, locale),
    dateISO: isoDate(post.data.date),
    cover: post.data.cover && {
      image: resolveCover(post.data.cover.src),
      alt: post.data.cover.alt,
    },
  };
}

/** One locale's posts, newest first. */
export async function getPosts(locale: LocaleCode): Promise<PostSummary[]> {
  const prefix = `${folders[locale]}/`;
  const posts = await getCollection('blog', (entry: Post) =>
    entry.id.startsWith(prefix),
  );

  return posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map(summarise);
}

/** Every post in every locale, newest first — for the sitemap. */
export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await getCollection('blog');
  return posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map(summarise);
}

/**
 * The two posts either side of this one within its own locale. The list runs
 * newest first, so the entry before it is the newer one.
 */
export function neighbours(posts: PostSummary[], slug: string) {
  const index = posts.findIndex((entry) => entry.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 ? posts[index + 1] : undefined,
  };
}

/** Every tag used in a locale, most-used first, ties broken alphabetically. */
export function collectTags(posts: PostSummary[]): string[] {
  const counts = new Map<string, number>();
  for (const entry of posts) {
    for (const tag of entry.post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

/**
 * The rail's table of contents. h2 and h3 only: h1 is the post title, which is
 * rendered by the layout rather than the body, and h4 down is finer than a
 * fourteen-mark column can usefully show.
 */
export function toToc(
  headings: { depth: number; slug: string; text: string }[],
): TocEntry[] {
  return headings
    .filter((heading) => heading.depth === 2 || heading.depth === 3)
    .map((heading) => ({
      id: heading.slug,
      text: heading.text,
      depth: heading.depth,
    }));
}

/**
 * A meta description, cut to what a search result will actually show.
 *
 * The excerpt is the post's whole opening paragraph, which is right for the
 * listing and the share card but routinely two hundred characters or more —
 * well past the point Google truncates. This trims a copy for the <meta>
 * tags only; the listing keeps the full paragraph.
 *
 * The two limits are different units, for the same reason reading time is:
 * a result snippet fits far fewer Han characters than Latin ones.
 */
export function metaDescription(text: string, locale: LocaleCode): string {
  const limit = locale === 'zh-Hant-TW' ? 78 : 155;
  if (text.length <= limit) return text;

  const slice = text.slice(0, limit);

  if (locale === 'zh-Hant-TW') {
    // Prefer ending on a sentence, which needs no ellipsis to read as whole.
    const stop = Math.max(slice.lastIndexOf('。'), slice.lastIndexOf('！'));
    if (stop > limit * 0.55) return slice.slice(0, stop + 1);
    return `${slice.replace(/[，、；：]$/, '')}…`;
  }

  const space = slice.lastIndexOf(' ');
  const cut = space > limit * 0.55 ? slice.slice(0, space) : slice;
  return `${cut.replace(/[\s,;:.]+$/, '')}…`;
}

/**
 * The structured data for a blog index.
 *
 * Without this the index falls through to Base's default ProfilePage, which
 * describes the home page: same @id, same url, different name. Two URLs
 * claiming to be the same node is worse than no markup at all, so each index
 * declares the Blog its posts already point at with `isPartOf`.
 */
export async function blogIndexSchema(locale: LocaleCode, site: URL | string) {
  const { blog, person } = getContent(locale);
  const posts = await getPosts(locale);

  const home = canonicalUrl('/', site).href.replace(/\/$/, '');
  const url = canonicalUrl(listPath(locale), site).href;
  const person_ = { '@id': `${home}/#person` };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: blog.metaTitle,
        description: blog.metaDescription,
        inLanguage: locale,
        author: person_,
        publisher: person_,
        blogPost: posts.map((entry) => ({
          '@type': 'BlogPosting',
          '@id': `${canonicalUrl(entry.href, site).href}#post`,
          headline: entry.post.data.title,
          url: canonicalUrl(entry.href, site).href,
          datePublished: entry.dateISO,
          author: person_,
        })),
      },
      {
        '@type': 'Person',
        '@id': `${home}/#person`,
        name: person.name,
        jobTitle: person.role,
        url: home,
        sameAs: [person.linkedin],
      },
    ],
  };
}
