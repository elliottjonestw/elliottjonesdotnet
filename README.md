# elliottjones.net

Personal resume site for Elliott Jones — a single static page plus a blog,
built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub
Pages. It ships in two languages: English at `/`, and Taiwan-style Traditional
Chinese at `/zh-tw`, using Astro's built-in i18n routing.

## Running it

```bash
npm install
npm run dev
```

Node 22.12 or newer is required (the `engines` field in `package.json`; CI
builds on Node 22).

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Dev server at http://localhost:4321            |
| `npm run build`   | Static build into `dist/`                      |
| `npm run preview` | Serve the built site locally                   |
| `npm run check`   | Type-check the Astro and TypeScript sources    |

## Editing content

**Page content lives in `src/data/content.en.ts` and
[`src/data/content.zh-TW.ts`](src/data/content.zh-TW.ts)** — one fully
written-out object per locale, both satisfying the `SiteContent` type in
[`src/data/content.ts`](src/data/content.ts). Bio, TOCFL results and the
listening score chart, experience, capabilities, work links, projects,
speaking, certifications, education and contact copy are typed data — edit the
matching field in both files and the page follows. Components in
`src/components` call `getContent(Astro.currentLocale)` and handle
presentation only; they don't hardcode copy.

Two locale files rather than one file with per-field overrides, because copy
that has to read naturally in each language doesn't compose well as a diff.
The one exception is `src/data/shared/speaking.ts`: the two CYBERSEC talks are
imported by both locale files unchanged, because they're deliberately kept in
English on the Chinese page too.

Three things worth knowing:

- **The Mandarin speaking video** is a Vimeo embed configured by
  `mandarin.speakingVideo`. If you swap the video, update `aspectRatio` to match
  the new one — Vimeo's own embed snippet states it as a `padding-top`
  percentage, where 75% means `4 / 3`.
- **Chinese text on the English page** is limited to the official TOCFL level
  names printed on the certificates — 流利級 (Level 5) and 高階級 (Level 4).
  Those five characters are served by a hand-subset font at
  `src/assets/fonts/noto-sans-tc-gloss.woff2` (2 KB), which sits in the
  `--font-mono` stack so it only ever supplies those glyphs. Adding another
  Chinese character to the English page means regenerating the subset — see
  below — otherwise it falls back to a system font.
- **The Chinese page** doesn't get a second self-hosted webfont. Its display
  and body faces fall through to whichever system CJK font the visitor's
  platform ships — PingFang TC on Apple platforms, Microsoft JhengHei on
  Windows, Noto Sans CJK TC elsewhere — declared as fallbacks in
  `--font-display` and `--font-body` in
  [`src/styles/global.css`](src/styles/global.css).

### Regenerating the Chinese subset font

```bash
curl -H "User-Agent: Mozilla/5.0" "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&text=%E6%B5%81%E5%88%A9%E7%B4%9A%E9%AB%98%E9%9A%8E&display=swap"
```

Download the `.woff2` the returned CSS points at, save it over
`src/assets/fonts/noto-sans-tc-gloss.woff2`, and update the `unicode-range` in
the `@font-face` block in [`src/styles/global.css`](src/styles/global.css).

## Writing a post

Posts are Markdown files in an Astro content collection, declared in
[`src/content.config.ts`](src/content.config.ts). **The folder decides the
language** — there is no locale field in the frontmatter, so a post's language
and its URL cannot disagree.

```
src/content/blog/
  en/ten-tips-for-learning-chinese.md     →  /blog/ten-tips-for-learning-chinese
  zh-tw/ten-tips-for-learning-chinese.md  →  /zh-tw/blog/ten-tips-for-learning-chinese
```

A translation pair is two files with the **same filename** in the two folders.
That shared name is what joins them: it drives the hreflang alternates, the
language switch on a post, and the sitemap. A post that exists in one language
only still builds — its language switch falls back to the other language's
blog index rather than a URL that was never generated.

Frontmatter:

```yaml
---
title: Ten tips for learning Chinese by yourself
date: 2026-08-05
tags: ['Language', 'Mandarin']
cover:
  src: ten-tips-for-learning-chinese/cover.jpg # path inside src/assets/blog/
  alt: The characters 聽, 說, 讀 and 寫 in jade across a dark field.
---
```

`cover` is optional; when present it becomes the post's `og:image`, rendered
to 1200×630 at build time. There is deliberately **no description, excerpt or
reading-time field** — all three are derived in
[`src/lib/blog.ts`](src/lib/blog.ts): the excerpt and meta description from the
post's first rendered paragraph, and the reading time from word count for
English and character count for Chinese, since the two are not measured in the
same unit.

Images live under `src/assets/` — covers under `src/assets/blog/<post-slug>/`
— and are referenced from the body by a relative path
(`../../../assets/certs/tocfl-score-report-2025.jpg`), so Astro optimises
them. Prose styling — headings, quotes, code blocks, figures, galleries,
embeds — is [`src/styles/blog.css`](src/styles/blog.css), imported by
`BlogPost.astro` rather than globally, so the home page never carries it. Code
blocks are highlighted by Astro's built-in Shiki; the language label in the
corner is drawn from the `data-language` attribute Shiki writes.

Two body features run through the markdown pipeline, which is Astro's default
processor extended with `@astrojs/markdown-satteri` in
[`astro.config.mjs`](astro.config.mjs):

- **`[TOC]`** — a paragraph whose only content is `[TOC]` becomes, where it
  stands, a box of links to the post's `h2`/`h3` headings, built by the hast
  plugins in [`src/lib/markdown-toc.ts`](src/lib/markdown-toc.ts). The heading
  ids are computed with the same rules Astro's own heading-ids pass uses, so
  every link lands on the id the heading actually gets.
- **Mermaid diagrams** — a <code>```mermaid</code> fence survives the build as
  a code block and is rendered to a site-themed SVG on the client. Mermaid
  itself is imported dynamically in `BlogPost.astro`, so only posts that
  contain a diagram pay for the library.

The two most recent posts also appear on the home page, in
`LatestPosts.astro`, as a `#blog` section between Speaking and Credentials —
with its own tracked mark in the section rail, like every other section. It
sits on the raised ground so it doesn't merge into Speaking above it, which is
why Credentials below it is on paper: the page alternates all the way down.
The route out to the full blog is the "All posts" link inside the section. On
a post the rail becomes a table of contents built from the post's `h2`/`h3`
headings, headed by an untracked mark back to the index.

The blog indexes themselves (`BlogIndex.astro`, rendered by both `/blog` and
`/zh-tw/blog`) list every post in a locale, newest first, with a tag filter
that only appears once there are at least two tags to choose between. Every
post stays in the HTML either way — the filter only hides rows.

Each post also carries its own furniture, assembled in
[`src/layouts/BlogPost.astro`](src/layouts/BlogPost.astro):

- **Read aloud** — the browser's own speech synthesis reads the article in the
  page's language, skipping tables, code and diagrams (`ReadAloud.astro`). No
  voice files, no third-party call.
- **Share panel** — LinkedIn, X and Facebook share URLs plus a copy-link
  button, all labelled (`ShareButtons.astro`).
- **Comments** — a hosted [Cusdis](https://cusdis.com) widget. The thread id
  is `<locale>:<slug>`, a stable route key, so renaming a post or moving
  domains cannot split the conversation into a new thread. Its interface
  strings live in `blog.commentsLocale` in the locale files.
- **View counts** — see the analytics bullet under *SEO and analytics*.

## Adding or editing a language

Locales are declared in two places that need to agree:
[`astro.config.mjs`](astro.config.mjs) (`i18n.locales`, which controls
routing) and [`src/i18n/locales.ts`](src/i18n/locales.ts) (`locales`, which
drives the language switch, hreflang tags and the sitemap). A new locale also
needs its own `src/data/content.<code>.ts` and a
`src/pages/<path>/index.astro` that mirrors `src/pages/index.astro`. For the
blog, it also needs a `src/content/blog/<path>/` folder, a
`src/pages/<path>/blog/index.astro` and a `src/pages/<path>/blog/[slug].astro`
mirroring the English pair, and an entry in the `folders` map in
[`src/lib/blog.ts`](src/lib/blog.ts).

## SEO and analytics

Everything lives in [`src/layouts/Base.astro`](src/layouts/Base.astro) and is
driven by `src/data/content.en.ts` / `content.zh-TW.ts`:

- **Title, description, canonical** — canonical URLs are normalised to
  extensionless paths (`https://elliottjones.net/`, not `/index.html`).
- **hreflang alternates** — every page carries a `<link rel="alternate"
  hreflang="…">` to every locale's copy of itself, plus an `x-default`
  pointing at English, so Google serves each visitor the right language rather
  than treating the two pages as duplicate content. Pages other than the home
  pages pass their own per-locale routes to `Base` as `altPaths`.
- **Open Graph and Twitter cards** point at `public/og.jpg` (1200×630) — the
  card LinkedIn renders when the link is shared. `og:locale` and
  `og:locale:alternate` switch per page. To change the image, re-render the
  card and replace that file. A post with a `cover` overrides it with its own
  1200×630 crop, and switches `og:type` to `article`.
- **Structured data** — a `ProfilePage` wrapping a `Person`, including
  `knowsLanguage`, `alumniOf`, `hasOccupation` and `hasCredential` (the three
  TOCFL results plus both certifications), so the Mandarin credentials are
  machine-readable on both locales. Posts replace it with a graph of their
  own — the `BlogPosting`, the `Blog` it belongs to and the `Person` — and
  each blog index declares its `Blog` the same way (`blogIndexSchema` in
  [`src/lib/blog.ts`](src/lib/blog.ts)), so the index never falls back to the
  home page's ProfilePage. Validate at
  [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- **`robots.txt`** allows everything and points at the sitemap. Both it and
  `sitemap.xml` are generated at build time — by
  [`src/pages/robots.txt.ts`](src/pages/robots.txt.ts) and
  [`src/pages/sitemap.xml.ts`](src/pages/sitemap.xml.ts) — so the sitemap line
  always names the deployed origin and `lastmod` tracks the deploy instead of
  going stale. The sitemap lists both locales' home pages, blog indexes and
  posts with the same hreflang alternates as the pages themselves.
- **`llms.txt`** — generated at build time by
  [`src/pages/llms.txt.ts`](src/pages/llms.txt.ts), following the format
  proposed at llmstxt.org: an H1 site name, a blockquote summary, then one
  section per locale listing the blog index and every post with its excerpt.
  A new post lands here the same build it lands in the sitemap.
- **Google Analytics 4** — property `G-YH3506Y1XQ`, carried over from the old
  site, set as `person.gaMeasurementId`. It is wrapped in
  `import.meta.env.PROD`, so `npm run dev` never sends hits to the property.
- **Public article view counts** — the Pages workflow runs
  `npm run sync:page-views` before every build and on an hourly schedule. It asks
  GA4 for all-time `screenPageViews`, combines the English and Traditional
  Chinese routes that share a slug, and embeds the result in each article. A
  count is shown only after it reaches 10 views. Expanding the card also shows
  the last 24 completed hourly buckets, the last 30 calendar days (including
  the current partial day), the top ten countries across all time, and when
  the report was generated — localised, in the GA property's own reporting
  timezone. The compiled report lives at `src/data/page-views.json`; the
  fallback is empty, so local builds work without Analytics access.

  To enable the sync, create a Google Cloud service account, enable the Google
  Analytics Data API for its project, then give that account **Viewer** access
  to the GA4 property. In the repository's **Settings → Secrets and variables
  → Actions**, add `GA4_PROPERTY_ID` (the numeric Property ID, not the `G-`
  Measurement ID) and `GA4_SERVICE_ACCOUNT_JSON` (the complete downloaded
  service-account key JSON). The workflow never publishes either secret. The
  script normalises trailing slashes, `index.html`, and the old GitHub project
  path before matching an article route, so those historic visits join the
  custom-domain total.
- **Search Console** — the old `google2e17a48e58355e7b.html` verification file
  still ships at the site root, so verification survives the rebuild.
- **Old URLs** — `/en.html` is a `noindex` meta-refresh stub that
  canonicalises to `/`; `/zh.html` canonicalises to the new `/zh-tw` page. The
  old blog indexes at `/en/blog` and `/zh/blog` now point at `/blog` and
  `/zh-tw/blog`; the portfolio indexes point at the home page's `#work`
  section. This keeps existing inbound links and search equity landing on the
  rebuild.

Note there is no cookie consent banner. The previous site ran GA the same way;
if you want one, that needs adding before the GA script fires.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages.

### Where the site is served from

The same build has to be correct in two places, which have different URL shapes:

| Where            | URL                                                | Base path            |
| ---------------- | -------------------------------------------------- | -------------------- |
| Project pages    | `elliottjonestw.github.io/elliottjonesdotnet/`     | `/elliottjonesdotnet` |
| Custom domain    | `elliottjones.net/`                                 | `/`                  |

The workflow runs `actions/configure-pages`, which reports whichever is actually
live, and passes `SITE` and `BASE_PATH` to the build. `astro.config.mjs` reads
them. Nothing needs editing when you switch to the custom domain — set it in the
repository settings and the next deploy corrects every asset URL, the canonical
tag, the sitemap and the structured data by itself.

If you hardcode `base` instead, assets are referenced from the origin root
(`/_astro/…`) and 404 on the project URL — the whole page loads unstyled.

Two notes while the site is on the project URL:

- `robots.txt` and `sitemap.xml` are only authoritative at a domain root, so
  crawlers will not read them at `…github.io/elliottjonesdotnet/robots.txt`.
  They start working once the custom domain is live.
- Local builds with no environment variables default to the custom domain, which
  is what you want for checking the production output.

### One-time setup in the repository

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain: `elliottjones.net`**, then tick
   *Enforce HTTPS* once the certificate is issued.
3. Point DNS at GitHub Pages:
   - `A` records for the apex `elliottjones.net` → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `elliottjonestw.github.io`

`public/CNAME` already contains the domain, so it ships with every build.

The previous site deployed over FTP to Bluehost.

## Redirects from the old URLs

Old URLs that were indexed (`/en.html`, `/zh.html`, the portfolio and blog
indexes) have meta-refresh stubs in `public/` so inbound links land on the
rebuild rather than a 404. The two blog stubs point at the new blog, the
portfolio stubs at the home page's `#work` section, and the home-page stubs at
the home page itself.
