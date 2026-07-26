// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://elliottjones.net',
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
