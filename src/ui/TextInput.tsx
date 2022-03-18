import React from 'react';
import { useElementFocus } from '~/hooks/useFocus';
import { classnames } from '~/util';

// REVIEW
type InputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props extends InputType {
	className?: string;
	beforeInput?: React.ReactNode;
	afterInput?: React.ReactNode;
	suggestions?: string[];
}

export default function TextInput({ className, beforeInput, afterInput, suggestions, ...props }: Props) {
	const [inputRef, isFocused] = useElementFocus<HTMLInputElement>();

	return (
		<div
			className={classnames(
				'flex items-center border-2 rounded bg-gray-50',
				isFocused && 'border-black',
				className
			)}
		>
			{beforeInput}
			<input {...props} ref={inputRef} type='text' className={'rounded outline-none p-2 bg-transparent flex-1'} />
			{afterInput}
		</div>
	);
}
