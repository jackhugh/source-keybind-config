interface Rule {
	pattern: RegExp;
	component: (match: string) => React.ReactNode;
	matches?: RegExpMatchArray | null;
}

interface Props {
	text: string;
}

export default function SyntaxHighlighter({ text }: Props) {
	const rules: Rule[] = [
		{
			pattern: /^\s*(bind)/gm,
			component: (match) => <span className='text-blue-500'>{match}</span>,
		},
		{
			pattern: /^\s*(alias)/gm,
			component: (match) => <span className='text-blue-500'>{match}</span>,
		},
	];
	return applySyntaxRules(text, rules);
}

function applySyntaxRules(text: string, rules: Rule[], globalFlags: string = 'gm') {
	const indexes = [];
	for (const rule of rules) {
		const matches = text.matchAll(rule.pattern);
		indexes.push(...matches);
	}

	const sortedIndexes = indexes.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

	const splitText = [];
	for (const match of sortedIndexes) {
		const matchStartIndex = match.index;
		const matchLength = match[0].length;
		const matchEndIndex = (match.index ?? 0) + matchLength;

		splitText.push();
	}
	console.log(sortedIndexes);
	return 'hello';
}
