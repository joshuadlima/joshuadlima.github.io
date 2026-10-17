/**
 * Site-wide settings. Personal details, links and the section list live here,
 * so updating them never requires touching a component.
 * The About text lives in src/content/about.md.
 */
import type { ImageMetadata } from 'astro';
import photo from '../assets/photo.png';

export interface Link {
	label: string;
	href: string;
}

export interface Section {
	/** Element id, used as the #anchor. */
	id: 'about' | 'projects' | 'experience' | 'contact';
	label: string;
}

export const site = {
	name: 'Joshua Dlima',
	description: 'Portfolio of Joshua Dlima, software engineer.',
	email: 'joshuanoahdlima@gmail.com', // TODO: replace me
	/** Shown next to a pulsing dot in Contact. Set to null to hide. */
	status: 'open to opportunities!' as string | null,
	/** Path inside public/, e.g. 'resume.pdf'. Set to null to hide the resume link. */
	resume: 'resume.pdf' as string | null,
	/** Photo shown in Contact, imported from src/assets/ so Astro optimizes it. Set to null to hide. */
	photo: photo as ImageMetadata | null,
	socials: [
		{ label: 'GitHub', href: 'https://github.com/joshuadlima' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/joshua-dlima' },
		{ label: 'Twitter', href: 'https://x.com/joshuadlima' },
		{ label: 'Codeforces', href: 'https://codeforces.com/profile/joshd' },
		{ label: 'Leetcode', href: 'https://leetcode.com/u/joshuadlima' }
	] satisfies Link[],
	/** Page sections, in scroll order. Drives the side navigation. */
	sections: [
		{ id: 'about', label: 'About' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'contact', label: 'Contact' },
	] satisfies Section[],
} as const;
