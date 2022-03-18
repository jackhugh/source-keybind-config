import { AliasNode } from './BaseNodes';
import { CommandGroupNode } from './CommandNodes';
import { BindTypeInterface, CommandAction, CommandsInterface } from './NodeTypes';

export class ChangeBindNode extends AliasNode {
	constructor(
		name: string,
		commands: CommandsInterface,
		modifierKey: string,
		defaultKey: string,
		bindType: BindTypeInterface
	) {
		super();
		this.name = name;

		const commandGroupName = `${modifierKey}_${defaultKey}_${bindType.code}a`;
		this.commands.push(`bind ${defaultKey} +${commandGroupName}`);

		this.addChildren(
			new CommandGroupNode(
				`+${commandGroupName}`,
				commands.press,
				CommandAction.Press,
				modifierKey,
				defaultKey,
				bindType
			),
			new CommandGroupNode(
				`-${commandGroupName}`,
				commands.release,
				CommandAction.Release,
				modifierKey,
				defaultKey,
				bindType
			)
		);
	}
}
