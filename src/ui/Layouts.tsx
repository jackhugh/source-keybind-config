import { classnames } from '~/util';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export function VerticalSpacer({ children, className }: Props) {
	return <div className={classnames('flex flex-col gap-2', className)}>{children}</div>;
}

export function HorizontalSpacer({ children, className }: Props) {
	return <div className={classnames('flex gap-2', className)}>{children}</div>;
}

export function Card({ children, className }: Props) {
	return <div className={classnames('flex flex-col p-5 gap-5 border-2 rounded', className)}>{children}</div>;
}
