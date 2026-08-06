/**
 * Taiwan-style Traditional Chinese content — a full translation of
 * content.en.ts, not a partial override. Two things are deliberately left
 * in English, matching content.en.ts exactly: the CYBERSEC talks (imported
 * from the same shared module) and the qualification grades/module names
 * under Education, which are the literal titles awarded by a British
 * institution.
 */

import awsLogo from '../assets/logos/aws.png';
import comptiaLogo from '../assets/logos/comptia.png';
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
import { speakingTalks } from './shared/speaking';
import type { SiteContent } from './content';

export const zhTW: SiteContent = {
  person: {
    name: 'Elliott Jones',
    role: '產品客戶成功經理',
    company: '睿控網安',
    location: '台北，台灣',
    email: 'elliottpublic.ghbxi@passinbox.com',
    linkedin: 'https://www.linkedin.com/in/elliottjonesjiehan/',
    siteUrl: 'https://elliottjones.net',
    metaTitle: 'Elliott Jones — 台北雙語產品客戶成功經理',
    metaDescription:
      '睿控網安（TXOne Networks）產品客戶成功經理。十餘年台灣與中國大陸經驗，取得 CEFR C1 中文能力認證。以英文為母語，專精 OT 資安、工業硬體與威脅情資領域的雙語技術溝通。',
    ogImageAlt:
      'Elliott Jones，睿控網安（TXOne Networks）產品客戶成功經理，現居台北。取得 CEFR C1 中文能力認證。',
    gaMeasurementId: 'G-YH3506Y1XQ',
  },

  knowsAbout: [
    '客戶成功',
    '技術寫作',
    '技術文件',
    '產品行銷',
    '中文（華語）',
    'OT 資安',
    '工業資安',
    '網路威脅情資',
    '嵌入式系統',
    '本地化',
  ],

  nav: {
    skipToContent: '跳至主要內容',
    sectionsLabel: '章節導覽',
    sections: [
      { id: 'top', label: '簡介' },
      { id: 'mandarin', label: '中文能力' },
      { id: 'experience', label: '工作經歷' },
      { id: 'capabilities', label: '我能做什麼' },
      { id: 'work', label: '精選作品' },
      { id: 'projects', label: '個人專案' },
      { id: 'speaking', label: '演講' },
      { id: 'blog', label: '部落格' },
      { id: 'credentials', label: '資格認證' },
      { id: 'contact', label: '聯絡方式' },
    ],
  },

  hero: {
    eyebrow: '客戶成功經理',
    lead: '我在台北的睿控網安擔任 OT 資安軟體的客戶成功經理。在台灣與大陸生活十年多，讓我具備業界大多數技術溝通者所沒有的能力：我能用中文與工程團隊討論，再寫出對外發布的英文內容。',
    facts: [
      { value: 'CEFR C1', label: '中文能力認證', href: '#mandarin' },
      { value: '10+ 年', label: '台灣與中國大陸經驗' },
      { value: '2 場', label: 'CYBERSEC 資安大會演講', href: '#speaking' },
      { value: '母語', label: '英式英文' },
    ],
    ctaMandarin: '看我的中文能力',
    ctaExperience: '我的工作經歷',
  },

  mandarin: {
    eyebrow: '差異化優勢',
    headline: '中文流利級，每天雙向使用。',
    body: '中文是我工作與生活中的主要語言，在台灣與中國大陸生活的這十年裡，大部分時間都是如此。我曾用中文為英國駐上海的外交機構管理 IT 系統，向台灣企業推廣威脅情資平台，現在則用中文支援一款 OT 資安產品的客戶。',
    resultsLabels: { score: '分數', tocfl: 'TOCFL', actfl: 'ACTFL', sat: '測驗日期' },
    results: [
      {
        skill: '聽力',
        score: '625 / 700',
        tocfl: '第5級 · 流利級',
        cefr: 'C1',
        actfl: 'Advanced High',
        date: '2025年6月',
        highlight: true,
      },
      {
        skill: '閱讀',
        score: '570 / 700',
        tocfl: '第4級 · 高階級',
        cefr: 'B2',
        actfl: 'Advanced High',
        date: '2025年6月',
        highlight: false,
      },
      {
        skill: '口說',
        score: '24 / 30',
        tocfl: '第4級 · 高階級',
        cefr: 'B2',
        actfl: 'Advanced Low',
        date: '2024年11月',
        highlight: false,
      },
    ],
    trend: {
      title: '趨勢，而非單次成績',
      body: '自2024年以來，我已經參加過四次 TOCFL 聽力測驗。每次成績都比前一次更高，第四次更達到了 CEFR C1 的門檻。',
    },
    hear: {
      title: '聽聽看',
      body: '證書只能證明有限的能力，這段影片則是我說中文的樣子。',
    },
    paperwork: {
      title: '官方證書',
      body: '由台灣教育部及「華語測驗推動工作委員會」核發。',
    },
    chart: {
      title: '四次測驗的 TOCFL 聽力成績',
      pointSeparator: '。',
      descSuffix: '。第5級、CEFR C1 的門檻為600分，於2025年6月21日達成。',
      bandTop: '第5級 · C1',
      bandBottom: '第4級 · B2',
    },
    speakingVideo: {
      vimeoId: '1213018519',
      title: 'Elliott Jones 說中文',
      aspectRatio: '16 / 9',
    },
    governmentBody: '中華民國教育部',
  },

  tocflListening: {
    bandFloors: { level4: 555, level5: 600, level6: 655 },
    axis: { min: 530, max: 640 },
    points: [
      { date: '2024年4月13日', short: '24年4月', score: 550 },
      { date: '2024年5月18日', short: '24年5月', score: 565 },
      { date: '2025年5月24日', short: '25年5月', score: 580 },
      { date: '2025年6月21日', short: '25年6月', score: 625 },
    ],
  },

  certificates: [
    {
      src: 'tocfl-score-report-2025.jpg',
      label: 'TOCFL 聽力與閱讀成績證明',
      caption: '聽力 第5級 · CEFR C1 — 2025年6月21日',
    },
    {
      src: 'tocfl-speaking-2024.jpg',
      label: 'TOCFL 口說成績證明',
      caption: '口說 第4級 · CEFR B2 — 2024年11月10日',
    },
  ],

  experience: {
    section: {
      label: '工作經歷',
      title: '從領事館 IT 到 OT 資安客戶成功。',
      intro:
        '從技術寫作、產品行銷、系統工程，到現在客戶成功，每個職位都在台灣企業，也用中文完成。',
    },
    roles: [
      {
        title: '客戶成功經理',
        company: '睿控網安',
        period: '2025年11月 – 現在',
        summary: '負責睿控網安 OT 端點防護產品 Stellar 的客戶成功與技術寫作。',
        logo: txoneLogo,
      },
      {
        title: '資深技術寫作者',
        company: '集博科技',
        period: '2024年11月 – 2025年11月',
        summary: '負責集博科技所有硬體與軟體產品的技術文件。',
        logo: tibboLogo,
      },
      {
        title: '產品行銷經理',
        company: 'TeamT5',
        period: '2023年5月 – 2024年11月',
        summary:
          '負責威脅情資平台 ThreatVision 的產品行銷。',
        logo: teamt5Logo,
      },
      {
        title: '資深技術寫作者',
        company: '宜鼎國際',
        period: '2022年2月 – 2023年2月',
        summary:
          '負責全球領先工業級 DRAM 與 Flash 製造商的英文內容。',
        logo: innodiskLogo,
      },
      {
        title: '系統工程師',
        company: '數位森林科技',
        period: '2021年3月 – 2022年2月',
        summary: '支援大型線上遊戲平台，並參與其 AWS 雲端遷移專案。',
        logo: digitalForestLogo,
      },
      {
        title: '資訊科技與安全專員',
        company: '英國駐上海總領事館',
        period: '2019年9月 – 2020年11月',
        summary: '負責管理英國駐上海總領事館超過100位使用者的 IT 系統。',
        logo: fcoLogo,
      },
    ],
  },

  capabilities: {
    section: {
      label: '我能做什麼',
      title: '既懂技術溝通，也能主導客戶關係。',
    },
    items: [
      {
        heading: '客戶成功',
        detail:
          '直接以中文與客戶及工程團隊合作，負責 OT 資安軟體的導入、技術支援與帳戶健康管理。',
      },
      {
        heading: '技術寫作',
        detail:
          '為工業硬體、嵌入式系統與資安產品撰寫使用手冊、API 與韌體文件、版本說明與知識庫。',
      },
      {
        heading: '產品行銷',
        detail:
          '負責企業資安與硬體產品的市場定位、上市活動、產品頁面、電子報與研討會演講。',
      },
      {
        heading: '影片與配音',
        detail: '撰寫腳本並配音產品影片與廣告，也曾在 COMPUTEX 現場入鏡受訪。',
      },
      {
        heading: 'IT 與基礎架構',
        detail: '管理超過100位使用者環境的系統維運、端點安全，以及 AWS 雲端遷移。',
      },
      {
        heading: '跨文化溝通',
        detail: '十年在台灣組織內工作的經驗，能在當地工程文化與國際客戶之間扮演橋樑。',
      },
    ],
  },

  work: {
    section: {
      label: '精選作品',
      title: '已發表、正式上線、隨時可供查閱。',
      intro:
        '以下是為工業硬體與通訊協定分析工具撰寫的技術文件、產品頁面與行銷活動範例，每個連結都連到實際上線的內容。',
    },
    stackLabel: '技術',
    groups: [
      {
        group: '技術文件',
        note: '為工程師撰寫的使用手冊與產品指南。',
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
        group: '產品頁面',
        note: '為商用硬體與軟體撰寫的定位與文案。',
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
        group: '電子報',
        note: '產品上市與客戶溝通活動。',
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
    ],
  },

  projects: {
    section: {
      label: '個人專案',
      title: '從規格到上線，親手實現的想法。',
    },
    stackLabel: '技術',
    items: [
      {
        title: 'Manda Chinese',
        kind: '網頁與桌面應用程式',
        year: '2026',
        summary:
          '一個免費平台，涵蓋學中文所需的一切功能。貼上任何簡體或繁體文字，就能變成附註讀本，每個字都標註拼音、釋義、語音與 HSK 等級。同一套程式碼同時支援網頁版，以及原生的 Windows 與 macOS 應用程式。',
        highlights: [
          '任何中文文字都能變成附註讀本，可即時查詞與播放語音',
          'CC-CEDICT 辭典，收錄超過12萬條詞條，支援手寫查字',
          '採用 jieba 進行斷詞，並編譯為 WebAssembly 執行',
          '支援照片、EPUB 與字幕匯入，全部在瀏覽器端解析',
          '間隔重複複習，涵蓋單字卡、填空與短文練習',
          '同時對應 HSK 3.0 與 TOCFL 的學習路徑與等級徽章',
          '速讀訓練功能，每分鐘字數可由120調整至400',
          '透過 Tauri 打包成原生應用，使用系統內建的 webview，而非 Electron',
          '真正離線可用：資料存於 IndexedDB，雲端同步為選用功能',
        ],
        stack: ['React', 'TypeScript', 'Vite', 'Tauri'],
        links: [
          { label: '開啟應用程式', href: 'https://mandachinese.com', primary: true },
          { label: '安裝', href: 'https://mandachinese.com/install', primary: false },
        ],
        shots: [
          {
            image: mandaShot,
            alt: 'Manda 閱讀器畫面，顯示一段以聲調上色、逐字標註拼音的中文文章。畫面中點開「有趣」一詞的查詢結果，顯示拼音、HSK 4 與 TOCFL 2 徽章，以及釋義「interesting; fascinating; amusing」，下方的等級分析顯示這段文字經分析32個詞彙後，難度約為 HSK 4。',
            caption: '閱讀器中的查詞畫面',
          },
          {
            image: mandaShot2,
            alt: 'Manda 儀表板畫面，顯示四個待複習的詞彙，附有單字卡與填空按鈕、連續學習天數與複習次數統計，以及顯示已掌握5,309個詞彙（佔辭典4.26%）的詞彙面板。',
            caption: '儀表板與複習佇列',
          },
        ],
      },
      {
        title: 'Paint 5.1：為現代系統重製',
        kind: '網頁與桌面應用程式',
        year: '2026',
        summary:
          '重現 Windows XP 內建的 Microsoft Paint，以 TypeScript 從零打造，可在瀏覽器執行，也有 macOS 與 Windows 的原生版本。這不是主題包，也不是致敬之作，而是完整重現原版功能與限制的重製版本。',
        highlights: [
          '完整重現原版全部16種工具，及其原始選項面板',
          '透過手寫編解碼器支援 BMP（1/4/8/24 位元）、GIF、JPEG 與 PNG',
          '手寫繪圖演算法，確保圖形落在與原版相同的像素位置',
          '完整重現 XP 版選單列，細節到「拉伸/扭曲」功能',
          '復原步驟上限為3層，且轉為黑白會清空復原記錄',
          '畫布只會向白色方向擴展，但移動選取範圍會留下背景色',
          '支援手機的觸控與手勢操作，且不做行動版版面調整',
          '可建置為 macOS、Windows 與網頁版本，且不需原生工具鏈',
          '55項自動測試，直接驗證真實的繪圖引擎、工具與編解碼器',
        ],
        stack: ['TypeScript', 'Electron', 'esbuild'],
        shots: [
          {
            image: paint51Shot,
            alt: 'Paint 5.1 執行畫面，畫面中保留原版工具箱、工具選項、調色盤與狀態列，畫布上繪有一間房子、一棵樹與一個太陽。',
            caption: '應用程式執行畫面',
          },
          {
            image: paint51Zoom,
            alt: '同一張畫布放大八倍後的畫面，每個像素都清楚顯示為格線上的一個方塊，縮放選項中已選取8倍。',
            caption: '8倍縮放，並開啟像素格線',
          },
        ],
        links: [
          {
            label: '開啟應用程式',
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
    ],
  },

  speaking: {
    section: {
      label: '演講',
      title: '台灣最大資安會議的講者。',
      intro:
        '在 CYBERSEC 2024 資安大會發表兩場演講，向亞太資安社群分享 TeamT5 的威脅情資成果。',
    },
    // Kept in English, as on the English page — see the module comment above.
    talks: speakingTalks,
  },

  credentials: {
    section: { label: '資格認證', title: '專業證照與學歷。' },
    certificationsHeading: '專業證照',
    educationHeading: '學歷',
    moduleSingular: '個科目',
    modulePlural: '個科目',
    hideLabel: '收合',
    certifications: [
      {
        title: 'AWS Solution Architect Associate',
        issuer: '亞馬遜雲端運算服務（AWS）',
        note: '已於2024年5月到期',
        logo: awsLogo,
      },
      {
        title: 'CompTIA A+',
        issuer: '美國電腦工業協會（CompTIA）',
        note: '已於2024年9月到期',
        logo: comptiaLogo,
      },
    ],
    education: [
      {
        subject: '資訊科技',
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
        subject: '健康及社會照護',
        school: '英國開放大學',
        logo: ouLogo,
        modules: [{ name: 'An introduction to health and social care', grade: 'Pass' }],
      },
    ],
  },

  contact: {
    eyebrow: '聯絡方式',
    title: '如果你需要一個能同時掌握兩種語言的人，歡迎聊聊。',
    body: '目前居住於{location}。歡迎洽談客戶成功、技術寫作，以及需要中英文雙語能力的產品職缺。',
    copyIdle: '複製電子郵件地址',
    copySuccess: '已複製',
    copyFallbackKey: '請按 ⌘C 複製',
    copyFallbackSelect: '請選取下方的地址',
    linkedinLabel: 'LinkedIn',
  },

  blog: {
    sectionLabel: '最新文章',
    sectionTitle: '部落格',
    indexTitle: 'Elliott Jones 的部落格',
    metaTitle: '部落格 — Elliott Jones',
    metaDescription:
      '關於中英雙語工作、OT 資安與工業硬體，以及這個網站如何打造的筆記。中英文各寫一遍。',
    filterLabel: '依標籤篩選',
    allTags: '全部',
    noPosts: '這個標籤下還沒有文章。',
    readMore: '閱讀更多',
    allPosts: '所有文章',
    minRead: '分鐘閱讀',
    publishedOn: '發表於',
    newerPost: '較新的文章',
    olderPost: '較舊的文章',
    backToTop: '回到頂部',
    sharePost: '分享這篇文章',
    shareLinkedIn: 'LinkedIn',
    shareX: 'X',
    shareFacebook: 'Facebook',
    copyLink: '複製連結',
    linkCopied: '已複製連結',
    copyUnavailable: '無法複製連結',
    backToSite: '首頁',
    tableOfContents: '目錄',
  },
};
