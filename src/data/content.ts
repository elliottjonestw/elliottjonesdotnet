/**
 * The shape every locale's content module must satisfy, plus the lookup that
 * picks one at render time. `en.ts` and `zh-TW.ts` are two independent,
 * fully-written-out objects — not a base file with patched-in overrides —
 * because copy that has to read naturally in each language doesn't compose
 * well as a diff. Structural facts that must never diverge between locales
 * (the CYBERSEC talks, in particular) are imported by both from
 * `shared/speaking.ts` instead of being retyped twice.
 */

import type { ImageMetadata } from 'astro';
import type { Talk } from './shared/speaking';
import { en } from './content.en';
import { zhTW } from './content.zh-TW';
import type { LocaleCode } from '../i18n/locales';

export interface Fact {
  value: string;
  label: string;
  href?: string;
}

export interface TocflPoint {
  date: string;
  short: string;
  score: number;
}

export interface TocflListening {
  bandFloors: { level4: number; level5: number; level6: number };
  axis: { min: number; max: number };
  points: TocflPoint[];
}

export interface MandarinResult {
  skill: string;
  score: string;
  tocfl: string;
  cefr: string;
  actfl: string;
  date: string;
  highlight: boolean;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface SectionCopy {
  label: string;
  title: string;
  intro?: string;
}

export interface Role {
  title: string;
  company: string;
  period: string;
  summary: string;
  logo: ImageMetadata;
  logoAlt: string;
  media?: { youtubeId: string; caption: string }[];
}

export interface Capability {
  heading: string;
  detail: string;
}

export interface WorkItem {
  label: string;
  href: string;
}

export interface WorkGroup {
  group: string;
  note: string;
  items: WorkItem[];
}

export interface ProjectShot {
  image: ImageMetadata;
  alt: string;
  caption: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  primary: boolean;
}

export interface Project {
  title: string;
  kind: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  shots: ProjectShot[];
}

export interface Certification {
  title: string;
  issuer: string;
  note: string;
  logo: ImageMetadata;
  logoAlt: string;
}

export interface EducationModule {
  name: string;
  grade: string;
}

export interface EducationEntry {
  subject: string;
  school: string;
  logo: ImageMetadata;
  logoAlt: string;
  modules: EducationModule[];
}

export interface Certificate {
  src: string;
  label: string;
  caption: string;
}

export interface SiteContent {
  person: {
    name: string;
    role: string;
    company: string;
    location: string;
    email: string;
    linkedin: string;
    siteUrl: string;
    metaTitle: string;
    metaDescription: string;
    /** Fully composed, per locale, rather than assembled from parts at render time. */
    ogImageAlt: string;
    gaMeasurementId: string;
  };
  knowsAbout: string[];
  nav: {
    skipToContent: string;
    /** Accessible name of the section rail that floats at the left on desktop. */
    sectionsLabel: string;
    /**
     * The rail's contents, in page order. `id` must match a `<section id>` in
     * `index.astro`; the icon for each id lives in `SectionRail.astro`.
     */
    sections: NavSection[];
  };
  hero: {
    eyebrow: string;
    lead: string;
    facts: Fact[];
    ctaMandarin: string;
    ctaExperience: string;
  };
  mandarin: {
    eyebrow: string;
    headline: string;
    body: string;
    resultsLabels: { score: string; tocfl: string; actfl: string; sat: string };
    results: MandarinResult[];
    trend: { title: string; body: string };
    hear: { title: string; body: string };
    paperwork: { title: string; body: string };
    chart: {
      title: string;
      /** Joins each "date: score / 700" fragment in the accessible chart description. */
      pointSeparator: string;
      descSuffix: string;
      bandTop: string;
      bandBottom: string;
    };
    speakingVideo: { vimeoId: string; title: string; aspectRatio: string };
    governmentBody: string;
  };
  tocflListening: TocflListening;
  certificates: Certificate[];
  experience: {
    section: SectionCopy;
    roles: Role[];
  };
  capabilities: {
    section: SectionCopy;
    items: Capability[];
  };
  work: {
    section: SectionCopy;
    stackLabel: string;
    groups: WorkGroup[];
  };
  projects: {
    section: SectionCopy;
    stackLabel: string;
    items: Project[];
  };
  speaking: {
    section: SectionCopy;
    talks: Talk[];
  };
  credentials: {
    section: SectionCopy;
    certificationsHeading: string;
    educationHeading: string;
    moduleSingular: string;
    modulePlural: string;
    hideLabel: string;
    certifications: Certification[];
    education: EducationEntry[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    copyIdle: string;
    copySuccess: string;
    copyFallbackKey: string;
    copyFallbackSelect: string;
    linkedinLabel: string;
  };
  /**
   * Every string the blog needs. The posts themselves are Markdown files under
   * src/content/blog, one folder per locale — only the furniture around them
   * lives here.
   */
  blog: {
    /** Homepage teaser section. */
    sectionLabel: string;
    sectionTitle: string;
    /** The h1 of the blog index at /blog and /zh-tw/blog. */
    indexTitle: string;
    metaTitle: string;
    metaDescription: string;
    /** Accessible name of the tag filter, and its "no filter" pill. */
    filterLabel: string;
    allTags: string;
    /** Shown when a tag filter leaves the list empty. */
    noPosts: string;
    readMore: string;
    allPosts: string;
    /** Prefix before the linked author name in the post metadata. */
    byAuthor: string;
    /** Follows the number: "6 min read". */
    minRead: string;
    /** Heading for the public all-time view-count card. */
    viewCountHeading: string;
    /** A public, all-time count. `{count}` is replaced with a localised number. */
    viewCount: string;
    viewCountDetailsOpen: string;
    viewCountDetailsClose: string;
    viewCountLast24Hours: string;
    viewCountLast30Days: string;
    viewCountCountries: string;
    /** Timestamp below the expanded card. `{date}` is replaced locally. */
    viewCountUpdated: string;
    publishedOn: string;
    newerPost: string;
    olderPost: string;
    backToTop: string;
    /** The labelled sharing panel beneath a post. */
    sharePost: string;
    shareLinkedIn: string;
    shareX: string;
    shareFacebook: string;
    copyLink: string;
    linkCopied: string;
    copyUnavailable: string;
    /** The link out of the blog and back to the single-page site. */
    backToSite: string;
    tableOfContents: string;
    /** The read-aloud control in the post header. */
    readAloudIdle: string;
    readAloudStop: string;
    /** Shown, disabled, where speech synthesis is unavailable. */
    readAloudUnsupported: string;
  };
}

export function getContent(locale: LocaleCode): SiteContent {
  return locale === 'zh-Hant-TW' ? zhTW : en;
}
