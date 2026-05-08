// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tokenjam.dev',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/draft/') }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
