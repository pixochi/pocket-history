// adds a language part 'en.' to wiki url
export const fixWikiLink = (link) => {
	if (!link) return false;

	const start = 'https://';
	const rest = link.slice(start.length);
	return `${start}en.${rest}`;
}