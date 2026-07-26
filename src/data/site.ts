/**
 * Single source of truth for every fact on the site.
 *
 * All content is carried over from the previous site (archived in /old) — the
 * English main page, the English portfolio page, and the TOCFL certificates and
 * score reports that were published alongside the old blog. Nothing here is
 * invented. Scores and levels are transcribed from the official Ministry of
 * Education score reports in src/assets/certs.
 */

import type { ImageMetadata } from 'astro';

import awsLogo from '../assets/logos/aws.png';
import comptiaLogo from '../assets/logos/comptia.png';
import cybersecLogo from '../assets/logos/cybersec.png';
import digitalForestLogo from '../assets/logos/digitalforest.png';
import dudleyLogo from '../assets/logos/dudleycollege.jpg';
import fcoLogo from '../assets/logos/fco.png';
import innodiskLogo from '../assets/logos/innodisk.png';
import ouLogo from '../assets/logos/ou.png';
import teamt5Logo from '../assets/logos/teamt5.png';
import tibboLogo from '../assets/logos/tibbo.png';
import txoneLogo from '../assets/logos/txone.jpg';
import paint51Shot from '../assets/projects/paint5-1.png';
import paint51Zoom from '../assets/projects/paint5-1-zoom.png';
import mandaShot from '../assets/projects/manda-1.png';
import mandaShot2 from '../assets/projects/manda-2.png';

/* ── Identity ─────────────────────────────────────────────────────────── */

export const person = {
  name: 'Elliott Jones',
  role: 'Product Customer Success Manager',
  company: 'TXOne Networks',
  location: 'Taipei, Taiwan',
  email: 'elliottpublic.ghbxi@passinbox.com',
  linkedin: 'https://www.linkedin.com/in/elliottjonesjiehan/',
  siteUrl: 'https://elliottjones.net',
  metaTitle:
    'Elliott Jones — Bilingual Product Customer Success Manager in Taipei',
  metaDescription:
    'Product Customer Success Manager at TXOne Networks. Over a decade in Taiwan and mainland China, with certified CEFR C1 Mandarin. Native English technical communicator across OT security, industrial hardware and threat intelligence.',
  /** GA4 property carried over from the previous site. Loads in production only. */
  gaMeasurementId: 'G-YH3506Y1XQ',
} as const;

/** Terms this page should be findable for; also feeds Person.knowsAbout. */
export const knowsAbout = [
  'Customer success',
  'Technical writing',
  'Technical documentation',
  'Product marketing',
  'Mandarin Chinese',
  'OT security',
  'Industrial cybersecurity',
  'Cyber threat intelligence',
  'Embedded systems',
  'Localization',
] as const;

/** Hero. The differentiator is stated in the first sentence, not buried. */
export const hero = {
  eyebrow: 'Product Customer Success Manager',
  lead: 'I look after customer success for OT security software at TXOne Networks in Taipei — and I do the job in Mandarin. Over a decade in Taiwan and mainland China has given me something most technical communicators in this industry do not have: I can sit with an engineering team in Chinese and then write the English that goes out to the world.',
  /** Shown as a mono data strip beneath the lead. Each is verifiable elsewhere on the page. */
  facts: [
    { value: 'CEFR C1', label: 'Certified Mandarin', href: '#mandarin' },
    { value: '10+ yrs', label: 'In Taiwan & mainland China' },
    { value: '2 talks', label: 'At CYBERSEC', href: '#speaking' },
    { value: 'Native', label: 'British English' },
  ],
} as const;

/* ── Mandarin: the headline feature ───────────────────────────────────── */

/**
 * TOCFL listening scores, transcribed from the score charts published with the
 * old blog posts. The April 2025 sitting is absent because the listening
 * section malfunctioned that day and produced no usable score.
 */
export const tocflListening = {
  bandFloors: { level4: 555, level5: 600, level6: 655 },
  axis: { min: 530, max: 640 },
  points: [
    { date: '13 Apr 2024', short: "Apr '24", score: 550 },
    { date: '18 May 2024', short: "May '24", score: 565 },
    { date: '24 May 2025', short: "May '25", score: 580 },
    { date: '21 Jun 2025', short: "Jun '25", score: 625 },
  ],
} as const;

export const mandarin = {
  headline: 'Certified at C1. Used every day, in both directions.',
  body: 'Mandarin is my primary language at work and at home, and has been for most of the decade I have spent in Taiwan and mainland China. I have used it to run IT for a British diplomatic mission in Shanghai, to market a threat intelligence platform to Taiwanese enterprises, and now to support customers of an OT security product.',
  /**
   * Official results, transcribed from the score reports in src/assets/certs.
   * The Chinese level names are the official TOCFL designations printed on the
   * certificates, not translations.
   */
  results: [
    {
      skill: 'Listening',
      score: '625 / 700',
      tocfl: 'Level 5 · 流利級',
      cefr: 'C1',
      actfl: 'Advanced High',
      date: 'June 2025',
      highlight: true,
    },
    {
      skill: 'Reading',
      score: '570 / 700',
      tocfl: 'Level 4 · 高階級',
      cefr: 'B2',
      actfl: 'Advanced High',
      date: 'June 2025',
      highlight: false,
    },
    {
      skill: 'Speaking',
      score: '24 / 30',
      tocfl: 'Level 4 · 高階級',
      cefr: 'B2',
      actfl: 'Advanced Low',
      date: 'November 2024',
      highlight: false,
    },
  ],
  speakingVideo: {
    vimeoId: '1213018519',
    title: 'Elliott Jones speaking Mandarin',
    /** The source file is 1920×1080, and Vimeo's oEmbed agrees, so 16:9. */
    aspectRatio: '16 / 9',
  },
} as const;

export const certificates = [
  {
    src: 'tocfl-score-report-2025.jpg',
    label: 'TOCFL listening and reading score report',
    caption: 'Listening Level 5 · CEFR C1 — 21 June 2025',
  },
  {
    src: 'tocfl-speaking-2024.jpg',
    label: 'TOCFL speaking score report',
    caption: 'Speaking Level 4 · CEFR B2 — 10 November 2024',
  },
] as const;

/* ── Experience ───────────────────────────────────────────────────────── */

export interface Role {
  title: string;
  company: string;
  start: string;
  end: string;
  period: string;
  summary: string;
  logo: ImageMetadata;
  current?: boolean;
  media?: { youtubeId: string; caption: string }[];
}

export const experience: Role[] = [
  {
    title: 'Product Customer Success Manager',
    company: 'TXOne Networks',
    start: 'Nov 2025',
    end: 'Present',
    period: 'Nov 2025 — Present',
    summary:
      'Customer success and technical writing for Stellar, TXOne’s OT endpoint protection product.',
    logo: txoneLogo,
    current: true,
  },
  {
    title: 'Senior Technical Writer',
    company: 'Tibbo Technology',
    start: 'Nov 2024',
    end: 'Nov 2025',
    period: 'Nov 2024 — Nov 2025',
    summary:
      'Owned the technical documentation for every Tibbo Technology hardware and software product.',
    logo: tibboLogo,
  },
  {
    title: 'Product Marketing Manager',
    company: 'TeamT5',
    start: 'May 2023',
    end: 'Nov 2024',
    period: 'May 2023 — Nov 2024',
    summary:
      'Ran product marketing for ThreatVision, a cyber threat intelligence platform, and spoke on the company’s behalf at CYBERSEC 2024.',
    logo: teamt5Logo,
  },
  {
    title: 'Senior Technical Writer',
    company: 'Innodisk Corporation',
    start: 'Feb 2022',
    end: 'Feb 2023',
    period: 'Feb 2022 — Feb 2023',
    summary:
      'Managed English language content for the world’s leading industrial DRAM and flash manufacturer, including scripting and voicing product video.',
    logo: innodiskLogo,
    media: [
      { youtubeId: 'nFokMe9Khm4', caption: 'Interviewed at COMPUTEX' },
      { youtubeId: 'xpaVDeuMswk', caption: 'Video I wrote and voiced' },
      { youtubeId: 'DdlSHMB7xOQ', caption: 'Advertisement I voiced' },
    ],
  },
  {
    title: 'IT Systems Engineer',
    company: 'Digital Forest Technologies',
    start: 'Mar 2021',
    end: 'Feb 2022',
    period: 'Mar 2021 — Feb 2022',
    summary:
      'Supported a large online gaming platform and worked on its migration to AWS.',
    logo: digitalForestLogo,
  },
  {
    title: 'IT & Security Coordinator',
    company: 'British Consulate-General Shanghai',
    start: 'Sep 2019',
    end: 'Nov 2020',
    period: 'Sep 2019 — Nov 2020',
    summary:
      'Managed IT systems for over 100 users at the British Consulate-General in Shanghai.',
    logo: fcoLogo,
  },
];

/* ── Selected work ────────────────────────────────────────────────────── */

export const work = [
  {
    group: 'Documentation',
    note: 'User manuals and product guides written for engineers.',
    items: [
      {
        label: 'IO Ninja — Serial Tap Pro',
        href: 'https://ioninja.com/doc/user-manual/hardware-serial-tap-pro.html',
      },
      {
        label: 'IO Ninja — Modbus Analyzer',
        href: 'https://ioninja.com/doc/user-manual/plugin-modbus.html',
      },
      {
        label: 'OSS — Remote Firmware Upgrade',
        href: 'https://docs.tibbo.com/oss_azure_firmware_upgrade',
      },
      {
        label: 'OSS — Connectivity Settings',
        href: 'https://docs.tibbo.com/oss_connectivity',
      },
      {
        label: 'OSS — SIM Card Installation',
        href: 'https://docs.tibbo.com/oss_sim_card_installation',
      },
      {
        label: 'OSS — Calibrating CO₂ Sensors',
        href: 'https://docs.tibbo.com/oss_calibrate_co2',
      },
      {
        label: 'AppBlocks — Temperature Monitoring',
        href: 'https://appblocks.io/elements/temperature_monitoring',
      },
    ],
  },
  {
    group: 'Product pages',
    note: 'Positioning and copy for commercial hardware and software.',
    items: [
      {
        label: 'IO Ninja — Serial Tap Pro',
        href: 'https://ioninja.com/hardware/serial-tap-pro.html',
      },
      {
        label: 'IO Ninja — Modbus Analyzer',
        href: 'https://ioninja.com/plugins/modbus.html',
      },
      {
        label: 'IO Ninja — Pipe Server',
        href: 'https://ioninja.com/plugins/pipe-server.html',
      },
    ],
  },
  {
    group: 'Newsletters',
    note: 'Product launch and customer campaigns.',
    items: [
      {
        label: 'Introducing Serial Tap Pro, the answer to all your serial needs',
        href: 'https://mailchi.mp/ioninja.com/july_2025',
      },
      {
        label: 'Meet the all-new Gen 3 TPP2 and Tibbit #61 lineup',
        href: 'https://mailchi.mp/tibbo/march_2025',
      },
      {
        label: "Easily automate and monitor farms with Tibbo's latest solutions",
        href: 'https://us15.campaign-archive.com/?u=a2ba07dd12fa729ce1704dba7&id=b82614f89a',
      },
    ],
  },
] as const;

/* ── Personal projects ────────────────────────────────────────────────── */

/**
 * Personal projects, published with their source. The copy deliberately
 * describes what the application does rather than claiming authorship of the
 * code. Every claim is taken from the project's own README or from the running
 * application.
 */
export const projects = [
  {
    title: 'Manda Chinese',
    kind: 'Browser & desktop app',
    year: '2026',
    summary:
      'Everything needed to learn Chinese in one free platform. Paste any Simplified or Traditional text and it becomes an annotated reader, with pinyin, definitions, audio and an HSK level on every word. The same codebase runs in the browser and ships as native Windows and macOS builds.',
    highlights: [
      'Any Chinese text becomes an annotated reader, with lookups and audio',
      'CC-CEDICT dictionary, 120,000+ entries, with handwriting search',
      'Word segmentation by jieba, compiled to WebAssembly',
      'Photo, EPUB and subtitle import, all parsed in the browser',
      'Spaced repetition across flashcards, cloze and passage sessions',
      'A learning path and level badges for both HSK 3.0 and TOCFL',
      'Speed-reading trainer, from 120 to 400 words per minute',
      'Native builds through Tauri, which uses the OS webview, not Electron',
      'Genuinely offline: data sits in IndexedDB, cloud sync is optional',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tauri'],
    links: [
      {
        label: 'Open the app',
        href: 'https://mandachinese.com',
        primary: true,
      },
      {
        label: 'Install it',
        href: 'https://mandachinese.com/install',
        primary: false,
      },
    ],
    shots: [
      {
        image: mandaShot,
        alt: 'The Manda reader showing a Chinese passage with tone-coloured characters and pinyin under every word. A lookup opened on 有趣 gives its pinyin, HSK 4 and TOCFL 2 badges and the definition “interesting; fascinating; amusing”, above a level breakdown putting the text at an estimated HSK 4 across 32 analysed words.',
        caption: 'A word lookup, open in the reader',
      },
      {
        image: mandaShot2,
        alt: 'The Manda dashboard, showing four words due for review with flashcard and cloze buttons, a day streak and review counters, and a vocabulary panel reporting 5,309 known words — 4.26 per cent of the dictionary.',
        caption: 'The dashboard and review queue',
      },
    ],
  },
  {
    title: 'Paint 5.1 Remade for Modern Systems',
    kind: 'Browser & desktop app',
    year: '2026',
    summary:
      'Microsoft Paint, as it shipped in Windows XP, rebuilt from scratch in TypeScript — running in the browser and natively on macOS and Windows. Not a theme and not a tribute: a reimplementation that reproduces the original’s features, and limitations.',
    /** Kept short deliberately: each one has to hold a single line in the card. */
    highlights: [
      'All 16 original tools, with their original option panes',
      'BMP (1/4/8/24-bit), GIF, JPEG and PNG via hand-written codecs',
      'Hand-written rasterisers, so shapes land on the original’s pixels',
      'The menu bar as XP shipped it, down to Stretch/Skew',
      'Undo capped at three levels, and wiped by a black-and-white conversion',
      'Canvas grows into white, but a moved selection leaves background colour',
      'Touch and gesture support on phones, with no mobile reflow',
      'Builds for macOS, Windows and the browser with no native toolchain',
      '55 self-tests driving the real rasterisers, tools and codecs',
    ],
    stack: ['TypeScript', 'Electron', 'esbuild'],
    /** The project's own docs/ screenshots, unretouched. */
    shots: [
      {
        image: paint51Shot,
        alt: 'Paint 5.1 running, with the original toolbox, tool options, colour palette and status bar around a canvas holding a drawing of a house, a tree and a sun.',
        caption: 'The application running',
      },
      {
        image: paint51Zoom,
        alt: 'The same canvas at eight times magnification, every pixel drawn as a discrete square on the grid, with 8× selected in the zoom options.',
        caption: '8× zoom, pixel grid on',
      },
    ],
    links: [
      {
        label: 'Open the app',
        href: 'https://elliottjonestw.github.io/paint5.1/',
        primary: true,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/elliottjonestw/paint5.1',
        primary: false,
      },
    ],
  },
] as const;

/* ── Speaking ─────────────────────────────────────────────────────────── */

export const speaking = [
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
] as const;

/* ── Credentials ──────────────────────────────────────────────────────── */

export const certifications = [
  {
    title: 'AWS Solution Architect Associate',
    issuer: 'Amazon Web Services',
    note: 'Expired May 2024',
    logo: awsLogo,
  },
  {
    title: 'CompTIA A+',
    issuer: 'Computing Technology Industry Association',
    note: 'Expired September 2024',
    logo: comptiaLogo,
  },
] as const;

export const education = [
  {
    subject: 'Information Technology',
    school: 'Dudley College of Technology',
    logo: dudleyLogo,
    modules: [
      { name: 'Communication and Employability Skills for IT', grade: 'Distinction' },
      { name: 'Computer Systems', grade: 'Merit' },
      { name: 'Information Systems', grade: 'Distinction' },
      { name: 'Object Oriented Programming', grade: 'Distinction' },
      { name: 'Client Side Customization of Web Pages', grade: 'Distinction' },
      { name: 'Developing Computer Games', grade: 'Distinction' },
      { name: 'Installing and Upgrading Software', grade: 'Distinction' },
      { name: 'Digital Graphics', grade: 'Distinction' },
      { name: 'Computer Game Design', grade: 'Distinction' },
    ],
  },
  {
    subject: 'Health and Social Care',
    school: 'Open University',
    logo: ouLogo,
    modules: [
      { name: 'An introduction to health and social care', grade: 'Pass' },
    ],
  },
] as const;

/* ── Capabilities ─────────────────────────────────────────────────────── */

export const capabilities = [
  {
    heading: 'Customer success',
    detail:
      'Onboarding, technical support and account health for OT security software, run directly with Mandarin-speaking customers and engineering teams.',
  },
  {
    heading: 'Technical writing',
    detail:
      'User manuals, API and firmware documentation, release notes and knowledge bases for industrial hardware, embedded systems and security products.',
  },
  {
    heading: 'Product marketing',
    detail:
      'Positioning, launch campaigns, product pages, newsletters and conference talks for enterprise security and hardware.',
  },
  {
    heading: 'Video and voice',
    detail:
      'Scripted and voiced product videos and advertising, and presented on camera at COMPUTEX.',
  },
  {
    heading: 'IT and infrastructure',
    detail:
      'Systems administration for 100+ user environments, endpoint security, and AWS cloud migration.',
  },
  {
    heading: 'Cross-cultural delivery',
    detail:
      'Ten years working inside Taiwanese organisations, translating between local engineering culture and international customers.',
  },
] as const;
