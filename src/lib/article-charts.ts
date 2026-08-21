import type * as Plot from '@observablehq/plot';

/** The small contract an article-specific chart module implements. */
export type ChartLocale = 'en' | 'zh-Hant';

export type ChartContext = {
  locale: ChartLocale;
  Plot: typeof Plot;
  numberFormat: Intl.NumberFormat;
  percentFormat: Intl.NumberFormat;
  colours: {
    jade: string;
    jadeBright: string;
    ink: string;
    slate: string;
    mist: string;
  };
};

export type ArticleChart = {
  render: (host: HTMLElement, width: number) => void;
  table: {
    label: string;
    headers: string[];
    rows: Array<Array<string | number>>;
  };
};

export type ArticleChartModule = {
  createCharts: (context: ChartContext) => Record<string, ArticleChart>;
};
