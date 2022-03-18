export enum CommandAction {
	Press = '+',
	Release = '-',
}

export interface BindTypeInterface {
	key: keyof KeyBindsInterface;
	code: string;
	polarCode: string;
	initAction: CommandAction;
}

export const BindTypes: { default: BindTypeInterface; modifier: BindTypeInterface } = {
	default: {
		key: 'defaultCommands',
		code: 'd',
		polarCode: 'm',
		initAction: CommandAction.Press,
	},
	modifier: {
		key: 'modifierCommands',
		code: 'm',
		polarCode: 'd',
		initAction: CommandAction.Release,
	},
};

export interface ModifierDefaultKeyBindsInterface {
	[modifierKey: string]: DefaultKeyBindsInterface;
}

export interface DefaultKeyBindsInterface {
	[defaultKey: string]: KeyBindsInterface;
}

export interface KeyBindsInterface {
	defaultCommands: CommandsInterface;
	modifierCommands: CommandsInterface;
}

export interface CommandsInterface {
	press: string[];
	release: string[];
}
