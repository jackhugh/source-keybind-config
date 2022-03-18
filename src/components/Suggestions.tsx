import { useState, useRef, useEffect, RefObject } from 'react';
import { useKey } from '~/hooks/useKey';
import { classnames } from '~/util';

export interface SuggestionInterface {
	value: string;
	description: string;
}

interface Props {
	setTextValue: React.Dispatch<React.SetStateAction<string>>;
	suggestions: SuggestionInterface[];
}

export default function AutoComplete({ setTextValue, suggestions }: Props) {
	const [activeItem, setActiveItem] = useState(0);
	const listRef = useRef<HTMLDivElement>(null);

	useKey(
		{
			ArrowDown: () => setActiveItem((prev) => (prev + 1 >= suggestions.length ? prev : ++prev)),
			ArrowUp: () => setActiveItem((prev) => (prev > 0 ? --prev : 0)),
			Enter: () => setTextValue(suggestions[activeItem].value ?? ''),
			Tab: () => setTextValue(suggestions[activeItem].value ?? ''),
		},
		[suggestions.length, activeItem]
	);

	useEffect(
		// TODO -TS error when using scrollintoviewifneeded, also not sure on support
		() => listRef.current?.children?.[activeItem]?.scrollIntoView({ block: 'nearest' }),
		[activeItem]
	);

	const suggestionsToRender = 10;

	return (
		<div
			className='absolute top-full border-2 border-blue-400 bg-white rounded left-0 min-w-full w-max max-w-2xl shadow z-10 mt-[-2px]'
			ref={listRef}
		>
			{suggestions
				// .splice(0, suggestionsToRender)
				.map((suggestion, key) => (
					<button
						className={classnames('p-2 block w-full text-left', activeItem === key && 'bg-gray-100')}
						onMouseDown={() => setTextValue(suggestion.value)}
						onMouseOver={() => setActiveItem(key)}
						key={suggestion.value}
					>
						<span className='font-medium'>{suggestion.value}</span>
						{suggestion.description && ` - ${suggestion.description}`}
					</button>
				))}
		</div>
	);
}
