import { ChangeEventHandler, MouseEventHandler } from 'react';
import IconButton from '~/ui/IconButton';
import TextInput from '~/ui/TextInput';

interface Props {
	command: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onRemove: MouseEventHandler<HTMLButtonElement>;
	canRemove: boolean;
}

export default function Command({ command, onChange, onRemove, canRemove = true }: Props) {
	return (
		<TextInput
			onChange={onChange}
			value={command}
			afterInput={
				canRemove && (
					<IconButton children={'-'} onClick={onRemove} className={'bg-red-500 hover:bg-red-400 mr-1'} />
				)
			}
		/>
	);
}
