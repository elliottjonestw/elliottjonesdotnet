import type { APIRoute } from 'astro';
import { canonicalUrl } from '../lib/url';

/**
 * Generated at build time rather than kept as a static file, so both lastmod and
 * the URL track the current deploy instead of drifting.
 */
export const GET: APIRoute = ({ site }) => {
  const home = canonicalUrl('/', site ?? 'https://elliottjones.net');
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${home.href}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
