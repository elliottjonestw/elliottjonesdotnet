// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * Origin and base path come from the deploy environment, because the same build
 * has to be correct in two places:
 *
 *   - project pages:  https://elliottjonestw.github.io/elliottjonesdotnet/
 *   - custom domain:  https://elliottjones.net/
 *
 * The Pages workflow fills these in from actions/configure-pages, which reports
 * whichever is actually live. Once the custom domain is set in the repository
 * settings, BASE_PATH becomes "/" and asset URLs correct themselves with no code
 * change. The fallbacks are the custom domain, for local builds.
 */
const site = process.env.SITE || 'https://elliottjones.net';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // Fully static output — required for GitHub Pages (no server runtime).
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Emit /about.html rather than /about/index.html so URLs stay extensionless
    // on GitHub Pages without relying on directory redirects.
    format: 'file',
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
