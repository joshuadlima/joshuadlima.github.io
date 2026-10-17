// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://joshuadlima.github.io',
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
		},
	},
});
