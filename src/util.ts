export function classnames(...classnames: (string | undefined | null | boolean)[]) {
	return classnames.filter(Boolean).join(' ');
}
