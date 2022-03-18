import { useEffect } from 'react';

// TODO bind to element and not document
export function useKey(keys, deps = []) {
	useEffect(() => {
		const listener = (e) => {
			const key = e.key;
			if (key in keys) {
				keys[key]();
			}
		};
		document.addEventListener('keydown', listener);
		return () => document.removeEventListener('keydown', listener);
	}, deps);
}
