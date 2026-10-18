// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://joshuadlima.github.io',

  markdown: {
      shikiConfig: {
          theme: 'github-dark',
      },
	},

  integrations: [sitemap()],
});