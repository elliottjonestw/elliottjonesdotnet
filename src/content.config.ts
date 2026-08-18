/**
 * The blog collection.
 *
 * Locale is carried by the folder a post sits in — `en/` or `zh-tw/` — rather
 * than by a frontmatter field, so it is impossible for a file to claim a
 * language its URL does not have. That mirrors the page-level routing, where
 * English is unprefixed and Chinese lives under /zh-tw.
 *
 * The id the glob loader generates is therefore "en/getting-started" and
 * "zh-tw/getting-started" — one id per file, and the two halves of a
 * translation pair share everything after the slash. `src/lib/blog.ts` is the
 * only place that splits them apart.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Not from 'astro:content': that re-export is deprecated and goes away in the
// next major.
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Optional editorial update date, shown in the post header when present. */
    lastUpdated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /**
     * Cover art, used for the per-post og:image and the head of the post.
     * `src` is a path inside src/assets/blog/ — "getting-started/cover.jpg" —
     * resolved to an ImageMetadata by `resolveCover()` rather than being
     * imported here, so frontmatter never has to carry ../../.. relative to
     * wherever the markdown file happens to live.
     */
    cover: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };
