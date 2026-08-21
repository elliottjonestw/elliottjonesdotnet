/**
 * The data that powers the charts in the naturalization post.
 *
 * Keep the numbers here rather than in chart configuration or markup: a future
 * update changes the charts and their optional data tables together.
 */

export type LocalizedLabel = {
  en: string;
  'zh-Hant': string;
};

export type CategorisedStatistic = {
  label: LocalizedLabel;
  total: number;
  men: number;
  women: number;
};

export const annualNaturalizations = [
  { year: 2016, total: 3252, men: 202, women: 3050, spouse: 2951 },
  { year: 2017, total: 5366, men: 443, women: 4923, spouse: 4668 },
  { year: 2018, total: 3552, men: 329, women: 3223, spouse: 3024 },
  { year: 2019, total: 3438, men: 341, women: 3097, spouse: 2960 },
  { year: 2020, total: 3818, men: 348, women: 3470, spouse: 3404 },
  { year: 2021, total: 4079, men: 396, women: 3683, spouse: 3671 },
  { year: 2022, total: 3589, men: 420, women: 3169, spouse: 3109 },
  { year: 2023, total: 3336, men: 435, women: 2901, spouse: 2904 },
  { year: 2024, total: 2575, men: 411, women: 2164, spouse: 2077 },
  { year: 2025, total: 1875, men: 325, women: 1550, spouse: 1487 },
] as const;

export const naturalizationReasons: CategorisedStatistic[] = [
  { label: { en: 'Spouse of an ROC national', 'zh-Hant': '國人配偶' }, total: 1487, men: 149, women: 1338 },
  { label: { en: 'Minor with ROC-national parent', 'zh-Hant': '未成年人父、母、養父或養母現為國人' }, total: 111, men: 55, women: 56 },
  { label: { en: 'Voluntary naturalization', 'zh-Hant': '自願' }, total: 93, men: 51, women: 42 },
  { label: { en: 'Supporting an ROC-national minor child', 'zh-Hant': '對限制或無行為能力之我國籍子女，有扶養事實、行使負擔權利義務或會面交往' }, total: 49, men: 2, women: 47 },
  { label: { en: 'High-level professional', 'zh-Hant': '高級專業人才' }, total: 47, men: 37, women: 10 },
  { label: { en: 'Ten years of legal residence', 'zh-Hant': '合法居留 10 年以上' }, total: 35, men: 18, women: 17 },
  { label: { en: 'Surviving spouse of an ROC national', 'zh-Hant': '國人配偶死亡未再婚，與配偶親屬往來或婚姻關係存續 2 年以上' }, total: 27, men: 1, women: 26 },
  { label: { en: 'Accompanying child', 'zh-Hant': '隨同' }, total: 17, men: 6, women: 11 },
  { label: { en: 'Special contributions to the ROC', 'zh-Hant': '殊勳我國' }, total: 5, men: 4, women: 1 },
  { label: { en: 'Divorced spouse because of domestic violence', 'zh-Hant': '為國人配偶受家暴離婚未再婚' }, total: 2, men: 0, women: 2 },
  { label: { en: 'Adopted by an ROC national', 'zh-Hant': '國人養子女' }, total: 1, men: 1, women: 0 },
  { label: { en: 'Born in Taiwan', 'zh-Hant': '出生於我國領域內' }, total: 1, men: 1, women: 0 },
];

export const originalNationalities: CategorisedStatistic[] = [
  { label: { en: 'Vietnam', 'zh-Hant': '越南' }, total: 1100, men: 93, women: 1007 },
  { label: { en: 'Philippines', 'zh-Hant': '菲律賓' }, total: 253, men: 29, women: 224 },
  { label: { en: 'Indonesia', 'zh-Hant': '印尼' }, total: 170, men: 23, women: 147 },
  { label: { en: 'Other countries', 'zh-Hant': '其他國家' }, total: 144, men: 106, women: 38 },
  { label: { en: 'Myanmar', 'zh-Hant': '緬甸' }, total: 77, men: 25, women: 52 },
  { label: { en: 'Japan', 'zh-Hant': '日本' }, total: 34, men: 12, women: 22 },
  { label: { en: 'Malaysia', 'zh-Hant': '馬來西亞' }, total: 32, men: 12, women: 20 },
  { label: { en: 'Thailand', 'zh-Hant': '泰國' }, total: 32, men: 7, women: 25 },
  { label: { en: 'United States', 'zh-Hant': '美國' }, total: 12, men: 8, women: 4 },
  { label: { en: 'Germany', 'zh-Hant': '德國' }, total: 9, men: 6, women: 3 },
  { label: { en: 'South Korea', 'zh-Hant': '韓國' }, total: 5, men: 1, women: 4 },
  { label: { en: 'Cambodia', 'zh-Hant': '柬埔寨（高棉）' }, total: 4, men: 0, women: 4 },
  { label: { en: 'Stateless or unspecified', 'zh-Hant': '無國籍（國籍不詳）' }, total: 2, men: 2, women: 0 },
  { label: { en: 'Singapore', 'zh-Hant': '新加坡' }, total: 1, men: 1, women: 0 },
];

export const naturalizationAges: CategorisedStatistic[] = [
  { label: { en: '0–4', 'zh-Hant': '0–4 歲' }, total: 11, men: 4, women: 7 },
  { label: { en: '5–9', 'zh-Hant': '5–9 歲' }, total: 12, men: 6, women: 6 },
  { label: { en: '10–14', 'zh-Hant': '10–14 歲' }, total: 45, men: 20, women: 25 },
  { label: { en: '15–19', 'zh-Hant': '15–19 歲' }, total: 61, men: 32, women: 29 },
  { label: { en: '20–24', 'zh-Hant': '20–24 歲' }, total: 30, men: 4, women: 26 },
  { label: { en: '25–29', 'zh-Hant': '25–29 歲' }, total: 258, men: 4, women: 254 },
  { label: { en: '30–34', 'zh-Hant': '30–34 歲' }, total: 372, men: 26, women: 346 },
  { label: { en: '35–39', 'zh-Hant': '35–39 歲' }, total: 385, men: 75, women: 310 },
  { label: { en: '40–44', 'zh-Hant': '40–44 歲' }, total: 332, men: 62, women: 270 },
  { label: { en: '45–49', 'zh-Hant': '45–49 歲' }, total: 154, men: 28, women: 126 },
  { label: { en: '50–54', 'zh-Hant': '50–54 歲' }, total: 100, men: 19, women: 81 },
  { label: { en: '55–59', 'zh-Hant': '55–59 歲' }, total: 50, men: 19, women: 31 },
  { label: { en: '60–64', 'zh-Hant': '60–64 歲' }, total: 27, men: 7, women: 20 },
  { label: { en: '65 and over', 'zh-Hant': '65 歲以上' }, total: 38, men: 19, women: 19 },
];

export const naturalizationPlaces: CategorisedStatistic[] = [
  { label: { en: 'New Taipei City', 'zh-Hant': '新北市' }, total: 363, men: 81, women: 282 },
  { label: { en: 'Taoyuan City', 'zh-Hant': '桃園市' }, total: 273, men: 39, women: 234 },
  { label: { en: 'Taichung City', 'zh-Hant': '臺中市' }, total: 219, men: 30, women: 189 },
  { label: { en: 'Kaohsiung City', 'zh-Hant': '高雄市' }, total: 162, men: 23, women: 139 },
  { label: { en: 'Taipei City', 'zh-Hant': '臺北市' }, total: 128, men: 46, women: 82 },
  { label: { en: 'Tainan City', 'zh-Hant': '臺南市' }, total: 125, men: 22, women: 103 },
  { label: { en: 'Changhua County', 'zh-Hant': '彰化縣' }, total: 107, men: 9, women: 98 },
  { label: { en: 'Yunlin County', 'zh-Hant': '雲林縣' }, total: 74, men: 9, women: 65 },
  { label: { en: 'Hsinchu County', 'zh-Hant': '新竹縣' }, total: 71, men: 9, women: 62 },
  { label: { en: 'Miaoli County', 'zh-Hant': '苗栗縣' }, total: 67, men: 13, women: 54 },
  { label: { en: 'Pingtung County', 'zh-Hant': '屏東縣' }, total: 52, men: 5, women: 47 },
  { label: { en: 'Chiayi County', 'zh-Hant': '嘉義縣' }, total: 46, men: 4, women: 42 },
  { label: { en: 'Hsinchu City', 'zh-Hant': '新竹市' }, total: 46, men: 14, women: 32 },
  { label: { en: 'Nantou County', 'zh-Hant': '南投縣' }, total: 42, men: 7, women: 35 },
  { label: { en: 'Yilan County', 'zh-Hant': '宜蘭縣' }, total: 29, men: 5, women: 24 },
  { label: { en: 'Keelung City', 'zh-Hant': '基隆市' }, total: 27, men: 4, women: 23 },
  { label: { en: 'Hualien County', 'zh-Hant': '花蓮縣' }, total: 16, men: 1, women: 15 },
  { label: { en: 'Chiayi City', 'zh-Hant': '嘉義市' }, total: 10, men: 1, women: 9 },
  { label: { en: 'Taitung County', 'zh-Hant': '臺東縣' }, total: 8, men: 2, women: 6 },
  { label: { en: 'Penghu County', 'zh-Hant': '澎湖縣' }, total: 6, men: 1, women: 5 },
  { label: { en: 'Kinmen County', 'zh-Hant': '金門縣' }, total: 2, men: 0, women: 2 },
  { label: { en: 'Lienchiang County', 'zh-Hant': '連江縣' }, total: 2, men: 0, women: 2 },
];
