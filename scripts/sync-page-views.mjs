/**
 * Fetch the all-time GA4 page-view count for every published article.
 *
 * This runs only in CI, immediately before Astro builds. The emitted JSON is
 * public, but the service-account credential used to make it never is.
 */
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, 'src/data/page-views.json');
const contentRoot = path.join(root, 'src/content/blog');

/** Recursively find Markdown filenames so the data shape follows the content. */
async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const children = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(entryPath);
      return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
    }),
  );
  return children.flat();
}

async function publishedSlugs() {
  const files = await markdownFiles(contentRoot);
  return new Set(
    files.map((file) => path.basename(file, '.md')),
  );
}

/**
 * GA tracks the browser's path, which may have a trailing slash, an
 * `index.html`, or the temporary GitHub project-page prefix. Normalising here
 * lets those historic visits join the custom-domain URL now shown to readers.
 */
function normalisePath(value) {
  let pathname = value.split('?')[0].replace(/\\/g, '/');
  pathname = pathname.replace(/\/index\.html?$/i, '');
  pathname = pathname.replace(/^\/elliottjonesdotnet(?=\/|$)/i, '');
  pathname = pathname.replace(/\/+$/, '');
  return pathname || '/';
}

function slugForPath(pathname, slugs) {
  const match = normalisePath(pathname).match(
    /^\/(?:zh-tw\/)?blog\/([^/]+)$/i,
  );
  if (!match) return undefined;

  const slug = decodeURIComponent(match[1]);
  return slugs.has(slug) ? slug : undefined;
}

function valueOf(row, index) {
  return row.metricValues?.[index]?.value ?? '0';
}

function dimensionOf(row, index) {
  return row.dimensionValues?.[index]?.value ?? '';
}

/** A sortable YYYYMMDDHH in the GA property's own reporting timezone. */
function dateHourInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const part = (type) => parts.find((item) => item.type === type)?.value ?? '00';
  return Number(`${part('year')}${part('month')}${part('day')}${part('hour')}`);
}

async function writeFallback(reason) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({ generatedAt: null, timeZone: null, views: {} }, null, 2)}\n`,
  );
  console.warn(`Page-view sync skipped: ${reason}`);
}

const propertyId = process.env.GA4_PROPERTY_ID;
const credentialJson = process.env.GA4_SERVICE_ACCOUNT_JSON;

if (!propertyId || !credentialJson) {
  await writeFallback('GA4_PROPERTY_ID or GA4_SERVICE_ACCOUNT_JSON is not set.');
  process.exit(0);
}

let credentials;
try {
  credentials = JSON.parse(credentialJson);
} catch {
  throw new Error('GA4_SERVICE_ACCOUNT_JSON must contain valid service-account JSON.');
}

const slugs = await publishedSlugs();
const client = new BetaAnalyticsDataClient({ credentials });
const property = `properties/${propertyId}`;
const [response] = await client.batchRunReports({
  property,
  requests: [
    {
      // The Data API will not accept dates earlier than 2015-08-14. Any GA4
      // property created later simply has no rows before its own creation date.
      dateRanges: [{ startDate: '2015-08-14', endDate: 'yesterday' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 100000,
    },
    {
      // `dateHour` lets us calculate the last 24 completed hourly buckets,
      // instead of treating a whole calendar day as "the last 24 hours".
      dateRanges: [{ startDate: 'yesterday', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'dateHour' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 100000,
    },
    {
      // A complete period avoids presenting a partly processed current day as
      // a comparable 30-day total.
      dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 100000,
    },
    {
      // Country totals follow the headline's all-time scope. The UI shows the
      // top ten, which keeps the public summary useful without overwhelming it.
      dateRanges: [{ startDate: '2015-08-14', endDate: 'yesterday' }],
      dimensions: [{ name: 'pagePath' }, { name: 'country' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 100000,
    },
  ],
});

const [allTimeReport, hourlyReport, thirtyDayReport, countryReport] = response.reports ?? [];
if (!allTimeReport || !hourlyReport || !thirtyDayReport || !countryReport) {
  throw new Error('GA4 did not return every requested page-view report.');
}

const views = Object.fromEntries(
  [...slugs].map((slug) => [
    slug,
    { allTime: 0, last24Hours: 0, last30Days: 0, countries: [] },
  ]),
);

for (const row of allTimeReport.rows ?? []) {
  const slug = slugForPath(dimensionOf(row, 0), slugs);
  if (slug) views[slug].allTime += Number(valueOf(row, 0));
}

const propertyTimeZone = hourlyReport.metadata?.timeZone ?? 'UTC';
const latestCompletedHour = dateHourInTimeZone(
  new Date(Date.now() - 60 * 60 * 1000),
  propertyTimeZone,
);
const firstIncludedHour = dateHourInTimeZone(
  new Date(Date.now() - 24 * 60 * 60 * 1000),
  propertyTimeZone,
);

for (const row of hourlyReport.rows ?? []) {
  const slug = slugForPath(dimensionOf(row, 0), slugs);
  const dateHour = Number(dimensionOf(row, 1));
  if (slug && dateHour >= firstIncludedHour && dateHour <= latestCompletedHour) {
    views[slug].last24Hours += Number(valueOf(row, 0));
  }
}

for (const row of thirtyDayReport.rows ?? []) {
  const slug = slugForPath(dimensionOf(row, 0), slugs);
  if (slug) views[slug].last30Days += Number(valueOf(row, 0));
}

const countriesBySlug = new Map();
for (const row of countryReport.rows ?? []) {
  const slug = slugForPath(dimensionOf(row, 0), slugs);
  const country = dimensionOf(row, 1);
  if (!slug || !country || country === '(not set)') continue;

  const countries = countriesBySlug.get(slug) ?? new Map();
  countries.set(country, (countries.get(country) ?? 0) + Number(valueOf(row, 0)));
  countriesBySlug.set(slug, countries);
}

for (const [slug, countries] of countriesBySlug) {
  views[slug].countries = [...countries]
    .map(([name, count]) => ({ name, count }))
    .sort((first, second) => second.count - first.count || first.name.localeCompare(second.name))
    .slice(0, 10);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), timeZone: propertyTimeZone, views }, null, 2)}\n`,
);
console.log(`Synced GA4 page-view summaries for ${slugs.size} article(s).`);
