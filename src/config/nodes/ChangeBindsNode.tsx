import { AliasNode } from './BaseNodes';
import { ChangeBindNode } from './ChangeBindNode';
import { BindTypeInterface, DefaultKeyBindsInterface } from './NodeTypes';

export class ChangeBindsNode extends AliasNode {
	constructor(name: string, binds: DefaultKeyBindsInterface, modifierKey: string, bindType: BindTypeInterface) {
		super();
		this.name = name;

		for (const defaultKey in binds) {
			const changeBindNodeName = `+${modifierKey}_${defaultKey}_${bindType.code}b`;
			this.commands.push(changeBindNodeName, `-${modifierKey}_${defaultKey}_${bindType.polarCode}a`);

			this.addChildren(
				new ChangeBindNode(
					changeBindNodeName,
					binds[defaultKey][bindType.key],
					modifierKey,
					defaultKey,
					bindType
				)
			);
		}
	}
}
