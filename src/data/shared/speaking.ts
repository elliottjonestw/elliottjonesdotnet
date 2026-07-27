/**
 * The two CYBERSEC talks. Imported verbatim by both locale content files —
 * kept in English on purpose, on both the English and Chinese page, rather
 * than translated per locale.
 */

import type { ImageMetadata } from 'astro';
import cybersecLogo from '../../assets/logos/cybersec.png';

export interface Talk {
  title: string;
  event: string;
  date: string;
  logo: ImageMetadata;
  abstract: string;
}

export const speakingTalks: Talk[] = [
  {
    title: "External Threats & Influence on Taiwan's 2024 Leadership Elections",
    event: 'CYBERSEC 2024',
    date: 'May 2024',
    logo: cybersecLogo,
    abstract:
      '2024 is a record-breaking year for elections around the globe, with over 60 countries home to roughly half of the world’s population set to hold national elections. On 13 January 2024, Taiwan kicked off this super-election year with its leadership elections. In this session we will discuss some of the ways external forces tried to influence these elections.',
  },
  {
    title: 'Localized Threat Intelligence for International Organizations',
    event: 'CYBERSEC 2024',
    date: 'May 2024',
    logo: cybersecLogo,
    abstract:
      'Localized threat intelligence is the kryptonite to threat actors, yet the majority of organizations overlook it completely. When you know who your enemy is, why not focus all your energy and resources into understanding them and staying one step ahead? Well, it’s next to impossible for most western governments to gather actionable intelligence on APAC adversaries, so companies have no chance at all.',
  },
];
