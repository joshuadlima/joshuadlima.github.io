/**
 * Prefixes a site-relative path with the configured `base` (see astro.config.mjs),
 * so links keep working when the site is served from a sub-path like /Portfolio/.
 *
 * withBase('projects/x/') -> '/Portfolio/projects/x/'
 * withBase('#contact')    -> '/Portfolio/#contact'
 */
export function withBase(path = ''): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}/${path.replace(/^\//, '')}`;
}
