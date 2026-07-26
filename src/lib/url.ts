/**
 * Helpers for building URLs that survive being served from a sub-path.
 *
 * Anything in public/ is referenced by a root-absolute path in the source but
 * must be prefixed with the configured base at build time, otherwise it 404s
 * when the site is served from https://user.github.io/repo/ rather than a
 * custom domain at the apex.
 */

/** Base path, always with exactly one trailing slash ("/" or "/repo/"). */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Prefix a public-directory path with the base: "og.jpg" → "/repo/og.jpg". */
export function withBase(path: string): string {
  return BASE + path.replace(/^\/+/, '');
}

/** Absolute URL for a public-directory path, for canonical and og: tags. */
export function absoluteUrl(path: string, site: URL | string): URL {
  return new URL(withBase(path), site);
}

/**
 * The site's canonical home. build.format 'file' makes the index pathname
 * "/index.html"; canonical URLs should be extensionless and the home page a
 * bare base path.
 */
export function canonicalUrl(pathname: string, site: URL | string): URL {
  const clean = pathname.replace(/index\.html$/, '').replace(/\.html$/, '');
  // "" and "/" both mean the home page, which lives at the base path — not at
  // the origin root, when the site is served from a sub-path.
  return new URL(clean === '' || clean === '/' ? BASE : clean, site);
}
