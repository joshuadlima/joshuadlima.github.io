/**
 * The single place that reads content collections. Pages call these helpers
 * instead of `getCollection` so filtering and ordering stay consistent.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Role = CollectionEntry<'experience'>;

const newestFirst = (a: Date, b: Date) => b.getTime() - a.getTime();

/** Featured projects first, then newest first. Drafts appear in dev only. */
export async function getProjects(): Promise<Project[]> {
	const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
	return projects.sort(
		(a, b) => Number(b.data.featured) - Number(a.data.featured) || newestFirst(a.data.date, b.data.date),
	);
}

/** Current roles first, then by most recent end date, then by start date. */
export async function getExperience(): Promise<Role[]> {
	const roles = await getCollection('experience');
	const endTime = (role: Role) => role.data.end?.getTime() ?? Infinity;
	return roles.sort((a, b) => endTime(b) - endTime(a) || newestFirst(a.data.start, b.data.start));
}
