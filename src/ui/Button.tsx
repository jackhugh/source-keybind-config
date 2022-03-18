import { classnames } from '~/util';

export enum ButtonStates {
	Normal = 'bg-blue-500 hover:bg-blue-400',
	Caution = 'bg-red-500 hover:bg-red-400',
	Success = 'bg-green-500 hover:bg-green-400',
}

type ButtonType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface Props extends Omit<ButtonType, 'name'> {
	name: React.ReactNode;
	state?: ButtonStates;
	className?: string;
}

export default function StyledButton({ name, className, state = ButtonStates.Normal, ...props }: Props) {
	return (
		<button {...props} className={classnames('text-white rounded py-2 px-5 font-medium', state, className)}>
			{name}
		</button>
	);
}
