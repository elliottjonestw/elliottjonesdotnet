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

async function writeFallback(reason) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({ generatedAt: null, views: {} }, null, 2)}\n`,
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
const [report] = await client.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '2000-01-01', endDate: 'yesterday' }],
  dimensions: [{ name: 'pagePath' }],
  metrics: [{ name: 'screenPageViews' }],
  limit: 100000,
});

const views = Object.fromEntries([...slugs].map((slug) => [slug, 0]));
for (const row of report.rows ?? []) {
  const slug = slugForPath(row.dimensionValues?.[0]?.value ?? '', slugs);
  if (!slug) continue;
  views[slug] += Number(row.metricValues?.[0]?.value ?? 0);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), views }, null, 2)}\n`,
);
console.log(`Synced GA4 page views for ${slugs.size} article(s).`);
