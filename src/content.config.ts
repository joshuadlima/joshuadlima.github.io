import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Projects: one folder per project containing `index.md` (usually the project's README)
 * plus any images it references. The folder name becomes the URL: /projects/<folder>/
 */
const projects = defineCollection({
	loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			date: z.coerce.date(),
			tags: z.array(z.string()).default([]),
			repo: z.url().optional(),
			demo: z.url().optional(),
			cover: image().optional(),
			featured: z.boolean().default(false),
			draft: z.boolean().default(false),
		}),
});

/** Experience: one Markdown file per role. The body holds what you did there. */
const experience = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/experience' }),
	schema: ({ image }) =>
		z.object({
			company: z.string(),
			role: z.string(),
			location: z.string().optional(),
			start: z.coerce.date(),
			/** Omit for a current role; it will display as "Present". */
			end: z.coerce.date().optional(),
			url: z.url().optional(),
			/** Company logo, placed next to the Markdown file. Light/white logos suit the dark theme. */
			logo: image().optional(),
		}),
});

export const collections = { projects, experience };
