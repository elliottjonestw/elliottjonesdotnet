import type { ArticleChartModule } from '../../lib/article-charts';
import {
  annualNaturalizations,
  naturalizationAges,
  naturalizationPlaces,
  naturalizationReasons,
  originalNationalities,
  type CategorisedStatistic,
} from '../naturalization-statistics';

const copy = {
  en: {
    annualTotal: 'Annual approvals', annualWomen: 'Women as a share of approvals',
    people: 'people', percent: 'percent', women: 'Women', men: 'Men', total: 'Total',
    spouse: 'Spouse of national', spouseShort: 'Spouse of national',
    year: 'Year', category: 'Category', location: 'County or city', age: 'Age group',
    nationality: 'Original nationality', reason: 'Recorded reason', splitBySex: 'split by sex',
  },
  'zh-Hant': {
    annualTotal: '每年歸化人數', annualWomen: '女性占歸化人數的比例',
    people: '人', percent: '百分比', women: '女', men: '男', total: '總計',
    spouse: '記錄為國人配偶', spouseShort: '國人配偶', year: '年度', category: '類別',
    location: '縣市別', age: '年齡組', nationality: '原屬國籍', reason: '記錄原因',
    splitBySex: '按性別區分',
  },
} as const;

const conciseReasonLabels = {
  en: {
    'Spouse of an ROC national': 'Spouse of ROC national',
    'Minor with ROC-national parent': 'Minor with ROC parent',
    'Voluntary naturalization': 'Voluntary',
    'Supporting an ROC-national minor child': 'Supporting minor',
    'High-level professional': 'High-level professional',
    'Ten years of legal residence': "10 years' residence",
    'Surviving spouse of an ROC national': 'Surviving ROC spouse',
    'Accompanying child': 'Accompanying child',
    'Special contributions to the ROC': 'Special contribution',
    'Divorced spouse because of domestic violence': 'Domestic violence divorce',
    'Adopted by an ROC national': 'Adopted by ROC national',
    'Born in Taiwan': 'Born in Taiwan',
  },
  'zh-Hant': {
    '國人配偶': '國人配偶',
    '未成年人父、母、養父或養母現為國人': '父母為國人的未成年人',
    '自願': '自願歸化',
    '對限制或無行為能力之我國籍子女，有扶養事實、行使負擔權利義務或會面交往': '扶養我國籍未成年子女',
    '高級專業人才': '高級專業人才',
    '合法居留 10 年以上': '合法居留 10 年',
    '國人配偶死亡未再婚，與配偶親屬往來或婚姻關係存續 2 年以上': '國人配偶死亡未再婚',
    '隨同': '隨同子女',
    '殊勳我國': '殊勳我國',
    '為國人配偶受家暴離婚未再婚': '因家暴離婚的國人配偶',
    '國人養子女': '國人養子女',
    '出生於我國領域內': '出生於我國',
  },
} as const;

const addTitle = (host: HTMLElement, label: string) => {
  const title = document.createElement('p');
  title.className = 'article-chart-title';
  title.textContent = label;
  host.append(title);
};

const plotClass = (plot: HTMLElement | SVGElement) => {
  plot.classList.add('article-plot');
  return plot;
};

export const createCharts: ArticleChartModule['createCharts'] = (context) => {
  const { locale, Plot, numberFormat, percentFormat, colours } = context;
  const labels = copy[locale];
  // The end labels sit inside Plot's right margin. Size it for the longer
  // localised series name so the label remains within the chart at all widths.
  const annualEndLabelMargin = Math.max(84, Math.ceil(labels.spouseShort.length * 6.2 + 20));
  const labelOf = (item: CategorisedStatistic) => item.label[locale];
  const categoryOf = (chart: string) => ({
    reason: labels.reason,
    nationality: labels.nationality,
    age: labels.age,
    place: labels.location,
  })[chart] ?? labels.category;
  const chartLabelOf = (item: CategorisedStatistic, chart: string) => {
    if (chart !== 'reason') return labelOf(item);
    const compact = conciseReasonLabels[locale] as Record<string, string>;
    return compact[labelOf(item)] ?? labelOf(item);
  };

  const plotStyle = {
    background: 'transparent',
    color: colours.ink,
    fontFamily: 'var(--font-mono)',
  };

  const annual = {
    render(host: HTMLElement, width: number) {
      const totalPlot = plotClass(Plot.plot({
        width,
        height: 250,
        marginTop: 18,
        marginRight: annualEndLabelMargin,
        marginBottom: 40,
        marginLeft: 54,
        style: plotStyle,
        ariaLabel: labels.annualTotal,
        ariaDescription: `${labels.annualTotal}, 2016–2025.`,
        x: { label: null, tickFormat: (year: number) => `${year}`, ticks: 5 },
        y: { label: null, grid: colours.mist, tickFormat: (value: number) => numberFormat.format(value) },
        marks: [
          Plot.ruleY([0], { stroke: colours.slate, strokeOpacity: 0.4 }),
          Plot.lineY(annualNaturalizations, {
            x: 'year', y: 'total', stroke: colours.jade, strokeWidth: 2.5, marker: true,
            title: (d) => `${d.year}: ${numberFormat.format(d.total)}`,
            ariaLabel: (d) => `${d.year}: ${numberFormat.format(d.total)}`,
          }),
          Plot.lineY(annualNaturalizations, {
            x: 'year', y: 'spouse', stroke: colours.slate, strokeWidth: 1.75,
            strokeDasharray: '4,3', marker: true,
            title: (d) => `${d.year}: ${labels.spouse}: ${numberFormat.format(d.spouse)}`,
            ariaLabel: (d) => `${d.year}, ${labels.spouse}: ${numberFormat.format(d.spouse)}`,
          }),
          Plot.text([annualNaturalizations.at(-1)!], {
            x: 'year', y: 'total', text: () => labels.total, dx: 8, dy: -9,
            textAnchor: 'start', fill: colours.jade, fontSize: 10, ariaHidden: 'true',
          }),
          Plot.text([annualNaturalizations.at(-1)!], {
            x: 'year', y: 'spouse', text: () => labels.spouseShort, dx: 8, dy: 11,
            textAnchor: 'start', fill: colours.slate, fontSize: 10, ariaHidden: 'true',
          }),
          Plot.dot(annualNaturalizations.filter((d) => d.year === 2017 || d.year === 2025), {
            x: 'year', y: 'total', r: 5, fill: colours.jadeBright, stroke: colours.jade,
            title: (d) => `${d.year}: ${numberFormat.format(d.total)}`,
          }),
        ],
      }));
      const womenPlot = plotClass(Plot.plot({
        width,
        height: 190,
        marginTop: 10,
        marginRight: 24,
        marginBottom: 40,
        marginLeft: 54,
        style: plotStyle,
        ariaLabel: labels.annualWomen,
        ariaDescription: `${labels.annualWomen}, 2016–2025.`,
        x: { label: null, tickFormat: (year: number) => `${year}`, ticks: 5 },
        // The panel title already states that this is a percentage. Plot puts a
        // vertical-axis label beside the top tick, where it collides with 100%.
        y: { label: null, domain: [0, 100], grid: colours.mist, tickFormat: (value: number) => `${value}%` },
        marks: [
          Plot.lineY(annualNaturalizations, {
            x: 'year', y: (d) => d.women / d.total * 100, stroke: colours.jadeBright,
            strokeWidth: 2.5, marker: true,
            title: (d) => `${d.year}: ${percentFormat.format(d.women / d.total * 100)}%`,
            ariaLabel: (d) => `${d.year}: ${percentFormat.format(d.women / d.total * 100)}%`,
          }),
        ],
      }));
      addTitle(host, labels.annualTotal);
      host.append(totalPlot);
      addTitle(host, labels.annualWomen);
      host.append(womenPlot);
    },
    table: {
      label: labels.annualTotal,
      headers: [labels.year, labels.total, labels.men, labels.women, labels.spouse],
      rows: annualNaturalizations.map((row) => [row.year, row.total, row.men, row.women, row.spouse]),
    },
  };

  const stacked = (chart: 'reason' | 'nationality' | 'age' | 'place', records: CategorisedStatistic[]) => ({
    render(host: HTMLElement, width: number) {
      const rows = records.map((record) => ({
        label: chartLabelOf(record, chart), total: record.total, men: record.men, women: record.women,
      }));
      const series = rows.flatMap((row) => [
        { ...row, sex: labels.women, start: 0, end: row.women },
        { ...row, sex: labels.men, start: row.women, end: row.total },
      ]);
      const height = Math.max(260, rows.length * (chart === 'place' ? 28 : 30) + 80);
      const preferredMargin = chart === 'reason' ? 240 : 158;
      const minimumMargin = chart === 'reason' ? 158 : 108;
      const marginLeft = Math.min(preferredMargin, Math.max(minimumMargin, width * 0.43));
      const plot = plotClass(Plot.plot({
        width,
        height,
        marginTop: 18,
        marginRight: 52,
        marginBottom: 38,
        marginLeft,
        style: plotStyle,
        ariaLabel: categoryOf(chart),
        ariaDescription: `${categoryOf(chart)}，${labels.splitBySex}。`,
        x: { label: null, grid: colours.mist, tickFormat: (value: number) => numberFormat.format(value) },
        y: { label: null, tickSize: 0, domain: rows.map((row) => row.label) },
        color: {
          domain: [labels.women, labels.men],
          // A warm counterpart to jade makes the two series distinguishable at
          // a glance, including in the small legend and narrow mobile bars.
          range: [colours.jade, '#b65d3b'],
          legend: true,
          label: null,
        },
        marks: [
          Plot.rectX(series, {
            x1: 'start', x2: 'end', y: 'label', fill: 'sex', inset: 1,
            title: (d) => `${d.label} — ${d.sex}: ${numberFormat.format(d.end - d.start)}`,
            ariaLabel: (d) => `${d.label}, ${d.sex}: ${numberFormat.format(d.end - d.start)}`,
          }),
          Plot.text(rows, {
            x: 'total', y: 'label', text: (d) => numberFormat.format(d.total), dx: 7,
            textAnchor: 'start', fill: colours.slate, fontSize: 11, ariaHidden: 'true',
          }),
        ],
      }));
      host.append(plot);
    },
    table: {
      label: categoryOf(chart),
      headers: [categoryOf(chart), labels.total, labels.men, labels.women],
      rows: records.map((record) => [labelOf(record), record.total, record.men, record.women]),
    },
  });

  return {
    annual,
    reason: stacked('reason', naturalizationReasons),
    nationality: stacked('nationality', originalNationalities),
    age: stacked('age', naturalizationAges),
    place: stacked('place', naturalizationPlaces),
  };
};
