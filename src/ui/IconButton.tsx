import { classnames } from '~/util';

interface Props {
	className?: string;
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({ className, children, onClick, ...props }: Props) {
	return (
		<button {...props} tabIndex={1} onClick={onClick} className={classnames('h-8 w-8 rounded', className)}>
			<span className='relative leading-none align-middle text-white font-medium text-lg'>{children}</span>
		</button>
	);
}
