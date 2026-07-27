# elliottjones.net

Personal resume site for Elliott Jones — a single static page built with
[Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages. It
ships in two languages: English at `/`, and Taiwan-style Traditional Chinese
at `/zh-tw`, using Astro's built-in i18n routing.

## Running it

```bash
npm install
npm run dev
```

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
[`src/data/content.ts`](src/data/content.ts). Bio, experience, TOCFL results,
portfolio links, speaking, certifications and education are typed data — edit
the matching field in both files and the page follows. Components in
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

## Adding or editing a language

Locales are declared in two places that need to agree:
[`astro.config.mjs`](astro.config.mjs) (`i18n.locales`, which controls
routing) and [`src/i18n/locales.ts`](src/i18n/locales.ts) (`locales`, which
drives the language switch, hreflang tags and the sitemap). A new locale also
needs its own `src/data/content.<code>.ts` and a
`src/pages/<path>/index.astro` that mirrors `src/pages/index.astro`.

## SEO and analytics

Everything lives in [`src/layouts/Base.astro`](src/layouts/Base.astro) and is
driven by `src/data/content.en.ts` / `content.zh-TW.ts`:

- **Title, description, canonical** — canonical URLs are normalised to
  extensionless paths (`https://elliottjones.net/`, not `/index.html`).
- **hreflang alternates** — every locale's home page carries a `<link
  rel="alternate" hreflang="…">` to every other locale plus itself, and an
  `x-default` pointing at English, so Google serves each visitor the right
  language rather than treating the two pages as duplicate content.
- **Open Graph and Twitter cards** point at `public/og.jpg` (1200×630) — the
  card LinkedIn renders when the link is shared. `og:locale` and
  `og:locale:alternate` switch per page. To change the image, re-render the
  card and replace that file.
- **Structured data** — a `ProfilePage` wrapping a `Person`, including
  `knowsLanguage`, `alumniOf`, `hasOccupation` and `hasCredential` (the three
  TOCFL results plus both certifications), so the Mandarin credentials are
  machine-readable on both locales. Validate at
  [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- **`robots.txt`** allows everything and points at the sitemap.
  `sitemap.xml` is generated at build time by
  [`src/pages/sitemap.xml.ts`](src/pages/sitemap.xml.ts) so `lastmod` tracks the
  deploy instead of going stale, and lists both locales with the same hreflang
  alternates as the pages themselves.
- **Google Analytics 4** — property `G-YH3506Y1XQ`, carried over from the old
  site, set as `person.gaMeasurementId`. It is wrapped in
  `import.meta.env.PROD`, so `npm run dev` never sends hits to the property.
- **Search Console** — the old `google2e17a48e58355e7b.html` verification file
  still ships at the site root, so verification survives the rebuild.
- **Old URLs** — `/en.html` is a `noindex` meta-refresh stub that
  canonicalises to `/`; `/zh.html` canonicalises to the new `/zh-tw` page.
  The portfolio/blog indexes still point at `/`. This keeps existing inbound
  links and search equity landing on the rebuild.

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

The previous site deployed over FTP to Bluehost. That workflow is preserved,
disabled, at `old/.github/workflows/ftp-deploy.yml` — the old site stays live at
the current host until DNS is repointed.

## The `old/` directory

The entire previous site is archived under [`old/`](old/) for reference: the
English and Chinese pages, the portfolio, the TOCFL blog, the 英地典 place-name
dictionary, and the original assets. Nothing there is built or served.

Old URLs that were indexed (`/en.html`, `/zh.html`, the portfolio and blog
indexes) have meta-refresh stubs in `public/` so inbound links land on the
rebuild rather than a 404.
