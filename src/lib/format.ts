// Content dates are written as YYYY-MM (or YYYY-MM-DD) and parsed as UTC midnight.
// Formatting in UTC keeps the displayed month from shifting with the build machine's timezone.
const monthFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });

/** e.g. "Oct 2026" */
export function formatMonth(date: Date): string {
	return monthFormat.format(date);
}

/** e.g. "Jul 2025 – Present" */
export function formatDateRange(start: Date, end?: Date): string {
	return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
