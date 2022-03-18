import { BaseNode, BindNode } from './BaseNodes';
import { ChangeBindsNode } from './ChangeBindsNode';
import { BindTypes, DefaultKeyBindsInterface } from './NodeTypes';

export class ModifierBindNode extends BindNode {
	constructor(modifierKey: string, binds: DefaultKeyBindsInterface) {
		super();
		this.bindKey = modifierKey;
		const changeBindsNodeName = `${modifierKey}_cb`;
		this.commands.push(`+${changeBindsNodeName}`);

		this.addChildren(new ChangeBindsNode(`-${changeBindsNodeName}`, binds, modifierKey, BindTypes.default));
		this.addChildren(new ChangeBindsNode(`+${changeBindsNodeName}`, binds, modifierKey, BindTypes.modifier));
		this.addChildren(new BaseNode(`-${modifierKey}_cb`));
	}
}
