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
			pattern: /(^\s*alias|^\s*bind)/gm,
			component: (match) => <span className='text-blue-500'>{match}</span>,
		},
		{
			pattern: /(".*?")/g,
			component: (match) => <span className='text-green-500'>{match}</span>,
		},
		{
			pattern: /^(\s*\S+)/gm,
			component: (match) => <span className='text-yellow-500'>{match}</span>,
		},
	];
	return <>{applySyntaxRules(text, rules)}</>;
}

function applySyntaxRules(text: string, rules: Rule[], globalFlags: string = 'gm') {
	const regexes: RegExp[] = [];

	rules.forEach((rule) => {
		regexes.push(new RegExp(rule.pattern));
		rule.matches = text.match(rule.pattern);
	});

	const matchAllRules = new RegExp(regexes.map((regex) => regex.source).join('|'), globalFlags);
	const splitText = text.split(matchAllRules);

	if (splitText.length <= 1) {
		return text;
	}

	return splitText.reduce((arr: React.ReactNode[], element) => {
		if (!element) return arr;

		for (const rule of rules) {
			if (rule.matches && rule.matches.includes(element)) {
				return [...arr, rule.component(element)];
			}
		}

		return [...arr, element];
	}, []);
}
