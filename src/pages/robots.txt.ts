import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/url';

/** Generated so the Sitemap line always points at the origin actually deployed. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = absoluteUrl('sitemap.xml', site ?? 'https://elliottjones.net');

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
