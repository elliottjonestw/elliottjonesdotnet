import type { LocaleCode } from '../i18n/locales';

/**
 * Public profiles that unambiguously identify Elliott Jones. Keep this list as
 * the single source of truth for Person.sameAs in every structured-data graph.
 */
export const personProfiles = {
  linkedin: 'https://www.linkedin.com/in/elliottjonesjiehan/',
  github: 'https://github.com/elliottjonestw',
} as const;

export const personSameAs = [personProfiles.linkedin, personProfiles.github] as const;

/**
 * Last material change to the visible profile in each locale. Update these
 * deliberately with a profile-content change; they must never reflect a build
 * or deployment date. Both locales' title and description changed on this date.
 */
export const profileModified: Record<LocaleCode, string> = {
  en: '2026-08-08',
  'zh-Hant-TW': '2026-08-08',
};
