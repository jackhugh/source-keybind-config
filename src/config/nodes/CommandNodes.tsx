import { AliasNode } from './BaseNodes';
import { BindTypeInterface, CommandAction } from './NodeTypes';

export class CommandNode extends AliasNode {
	constructor(name: string, command: string) {
		super();
		this.name = name;
		this.commands.push(command);
	}
}

export class CommandGroupNode extends AliasNode {
	constructor(
		name: string,
		commands: string[],
		commandAction: CommandAction,
		modifierKey: string,
		defaultKey: string,
		bindType: BindTypeInterface
	) {
		super();
		this.name = name;

		commands.forEach((command, key) => {
			const commandName = `${commandAction}${modifierKey}_${defaultKey}_${bindType.code}a_${key}`;
			this.commands.push(commandName);
			this.addChildren(new CommandNode(commandName, command));
		});
	}
}
