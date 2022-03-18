import { useEffect, useRef, useState } from 'react';

export function useElementFocus<ElementType extends HTMLElement>() {
	const ref = useRef<ElementType>(null);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!ref.current) throw Error('Element ref is not assigned');

		const focusListener = () => setIsFocused(true);
		const blurListener = () => setIsFocused(false);

		ref.current.addEventListener('focus', focusListener);
		ref.current.addEventListener('blur', blurListener);

		return () => {
			if (ref.current) {
				ref.current.removeEventListener('focus', focusListener);
				ref.current.removeEventListener('blur', blurListener);
			}
		};
	}, []);

	return [ref, isFocused] as const;
}
