import Button, { ButtonStates } from '~/ui/Button';
import { matchSorter } from 'match-sorter';
import { Card, HorizontalSpacer, VerticalSpacer } from '~/ui/Layouts';
import TextInput from '~/ui/TextInput';
import Command from './Command';
import IconButton from '~/ui/IconButton';
import { SuggestionInterface } from './Suggestions';
import { ObjectArrayReducerInterface } from '~/reducers/objectArrayReducer';

export enum CommandType {
	default = 'defaultCommands',
	modifier = 'modifierCommands',
}

export interface BindInterface {
	id: string;
	defaultKey: string;
	modifierKey: string;
	defaultCommands: string[];
	modifierCommands: string[];
}

interface BindProps {
	bindData: BindInterface;
	bindActions: ObjectArrayReducerInterface<BindInterface>;
	suggestionData: {
		cvars: SuggestionInterface[];
		keys: SuggestionInterface[];
	};
	canRemove: boolean;
}

export default function Bind({ bindData, bindActions, suggestionData, canRemove = true }: BindProps) {
	// TODO - can this use the other reducer?
	// Use interface here if we can't extract the types somehow?
	const commandActions = {
		add(commandType: CommandType) {
			bindData[commandType].push('');
			bindActions.set(bindData);
		},
		set(commandType: CommandType, key: number, value: string) {
			bindData[commandType][key] = value;
			bindActions.set(bindData);
		},
		remove(commandType: CommandType, key: number) {
			bindData[commandType].splice(key, 1);
			bindActions.set(bindData);
		},
	};

	const getKeySuggestions = (query: string) =>
		matchSorter(suggestionData.keys, query.trim(), { keys: ['value', 'description'] }).splice(0, 10);

	const getCvarSuggestions = (query: string) =>
		matchSorter(suggestionData.cvars, query.trim(), { keys: ['value', 'description'] }).splice(0, 10);

	return (
		<Card>
			<HorizontalSpacer>
				<VerticalTextInput
					name={'Main Key'}
					value={bindData.defaultKey}
					onChange={(e) => bindActions.set({ ...bindData, defaultKey: e.target.value })}
				/>
				<VerticalTextInput
					name={'Modifier Key'}
					value={bindData.modifierKey}
					onChange={(e) => bindActions.set({ ...bindData, modifierKey: e.target.value })}
				/>
			</HorizontalSpacer>

			<CommandGroup
				commands={bindData.defaultCommands}
				commandActions={commandActions}
				type={CommandType.default}
				name={'Default Commands'}
				keys={[bindData.defaultKey]}
			/>
			<CommandGroup
				className={'-mt-8'}
				commands={bindData.modifierCommands}
				commandActions={commandActions}
				type={CommandType.modifier}
				name={'Modifier Commands'}
				keys={[bindData.modifierKey, bindData.defaultKey]}
			/>

			{canRemove && (
				<Button
					name='Remove'
					state={ButtonStates.Caution}
					className='self-start'
					onClick={() => bindActions.remove(bindData)}
				/>
			)}
		</Card>
	);
}

interface VerticalTextInputProps {
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	name: string;
}
function VerticalTextInput({ value, onChange, name }: VerticalTextInputProps) {
	return (
		<VerticalSpacer className='flex-1'>
			<div>{name}</div>
			<TextInput value={value} onChange={onChange} />
		</VerticalSpacer>
	);
}

interface CommandGroupProps {
	commands: string[];
	commandActions: any;
	type: CommandType;
	name: string;
	keys: string[];
	className?: string;
}
function CommandGroup({ commands, commandActions, type, name, keys, className }: CommandGroupProps) {
	const isValidKeys = keys.every((key) => key.trim());
	return (
		<VerticalSpacer className={className}>
			<div>
				{name} {isValidKeys && <span className='font-normal text-sm italic'>{`(${keys.join(' + ')})`}</span>}
			</div>
			{commands.map((command, key) => (
				<Command
					command={command}
					canRemove={key > 0}
					onChange={(e) => commandActions.set(type, key, e.target.value)}
					onRemove={() => commandActions.remove(type, key)}
				/>
			))}
			{/* TODO - move this inside a div container with padding instead of using mr-[6px] */}
			<IconButton
				className='bg-blue-500 hover:bg-blue-400 self-end mr-[6px]'
				onClick={() => commandActions.add(type)}
				children={'+'}
			/>
		</VerticalSpacer>
	);
}
