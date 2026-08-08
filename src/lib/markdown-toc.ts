/**
 * The `[TOC]` marker.
 *
 * A paragraph whose only content is `[TOC]` is replaced, where it stands, by
 * a box of links to the document's h2 and h3 headings — the same depths the
 * contents rail shows, for the same reasons: h1 is the post title, rendered
 * by the layout rather than the body, and h4 down is finer than a contents
 * list can usefully carry.
 *
 * Two hast plugins, because the whole heading list has to be known before
 * the marker can be replaced, and satteri walks the tree once per plugin:
 * the first pass collects the headings, the second renders the marker. Both
 * run before Astro's own heading-ids pass, so the ids do not exist yet and
 * the slugs are computed here instead — under exactly the same rules that
 * pass uses (github-slugger over the heading's text, in document order,
 * keeping an explicit id when a heading already has one), so every href
 * lands on the id the headings actually get.
 */

import { defineHastPlugin } from 'satteri';
import Slugger from 'github-slugger';
import { getContent } from '../data/content';
import type { LocaleCode } from '../i18n/locales';

interface CollectedHeading {
  depth: number;
  text: string;
  /** Present only when the heading carries its own id attribute. */
  id?: string;
}

interface TocItem {
  slug: string;
  text: string;
  children: TocItem[];
}

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/** Shared between the two passes, on the compile's data bag. */
const DATA_KEY = 'tocHeadings';

const collectHeadings = defineHastPlugin({
  name: 'inline-toc-collect',
  element: {
    filter: HEADING_TAGS,
    visit(node, ctx) {
      const headings = (ctx.data[DATA_KEY] as CollectedHeading[]) ?? [];
      const id = node.properties?.id;
      headings.push({
        depth: Number.parseInt(node.tagName[1], 10),
        text: ctx.textContent(node),
        ...(typeof id === 'string' ? { id } : {}),
      });
      ctx.data[DATA_KEY] = headings;
    },
  },
});

const renderInlineToc = defineHastPlugin({
  name: 'inline-toc-render',
  element: {
    filter: ['p'],
    visit(node, ctx) {
      if (ctx.textContent(node).trim().toLowerCase() !== '[toc]') return;

      const headings = (ctx.data[DATA_KEY] as CollectedHeading[] | undefined)
        ?.filter((heading) => heading.depth === 2 || heading.depth === 3);
      if (!headings || headings.length === 0) {
        // A marker with nothing to list should not leave "[TOC]" in the
        // reading column as literal text.
        ctx.removeNode(node);
        return;
      }

      const locale: LocaleCode = ctx.fileURL?.pathname.includes('/zh-tw/')
        ? 'zh-Hant-TW'
        : 'en';
      const label = getContent(locale).blog.tableOfContents;
      ctx.replaceNode(node, {
        type: 'raw',
        value: tocHtml(items(headings), label),
      });
    },
  },
});

export const inlineTocPlugins = [collectHeadings, renderInlineToc];

/**
 * Give every heading the id it will end up with. Mirrors Astro's
 * heading-ids pass: an id of its own wins; otherwise the slugger decides,
 * called in document order and only for headings without an id, so its
 * duplicate counters stay in step with the pass that assigns the ids.
 */
function items(headings: CollectedHeading[]): TocItem[] {
  const slugger = new Slugger();
  const flat = headings.map((heading) => ({
    slug: heading.id ?? slugger.slug(heading.text),
    text: heading.text,
    depth: heading.depth,
    children: [] as TocItem[],
  }));

  // h3 entries hang off the h2 they follow; an h3 before any h2 stands
  // alone at the top level rather than being dropped.
  const top: TocItem[] = [];
  for (const entry of flat) {
    if (entry.depth === 2 || top.length === 0) top.push(entry);
    else top[top.length - 1].children.push(entry);
  }
  return top;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function tocHtml(top: TocItem[], label: string): string {
  const item = (entry: TocItem): string =>
    `<li><a href="#${escapeHtml(entry.slug)}">${escapeHtml(entry.text)}</a>${
      entry.children.length
        ? `<ul>${entry.children.map(item).join('')}</ul>`
        : ''
    }</li>`;

  return (
    `<nav class="post-toc" aria-label="${escapeHtml(label)}">` +
    `<p class="post-toc-title">${escapeHtml(label)}</p>` +
    `<ul>${top.map(item).join('')}</ul>` +
    `</nav>`
  );
}
