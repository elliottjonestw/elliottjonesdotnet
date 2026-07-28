/**
 * The two locales the site is built in. Kept as a tiny hand-rolled list
 * rather than reading astro:i18n's config at runtime, so every consumer
 * (Base, the language switch, the sitemap) shares one source of truth for
 * the label, hreflang tag and URL path of each locale.
 */

export type LocaleCode = 'en' | 'zh-Hant-TW';

export interface LocaleMeta {
  code: LocaleCode;
  /** Path segment under the site root; '' for the unprefixed default locale. */
  path: string;
  /** BCP 47 tag used for hreflang, html[lang] and og:locale. */
  hreflang: string;
  /** og:locale uses underscores rather than hyphens. */
  ogLocale: string;
  /** Label shown in the language switch. */
  label: string;
  /** Single-glyph label for the compact phone switch. */
  short: string;
  /** The language's own name, used as the accessible name of the switch. */
  name: string;
}

export const locales: LocaleMeta[] = [
  {
    code: 'en',
    path: '',
    hreflang: 'en',
    ogLocale: 'en_GB',
    label: 'EN',
    short: 'EN',
    name: 'English',
  },
  {
    code: 'zh-Hant-TW',
    path: 'zh-tw',
    hreflang: 'zh-Hant-TW',
    ogLocale: 'zh_TW',
    label: '中文',
    short: '中',
    name: '中文',
  },
];

const defaultLocale: LocaleCode = 'en';

/** Narrows Astro.currentLocale (a plain string, possibly undefined) to a known locale. */
export function resolveLocale(value: string | undefined): LocaleCode {
  return value === 'zh-Hant-TW' ? 'zh-Hant-TW' : defaultLocale;
}
