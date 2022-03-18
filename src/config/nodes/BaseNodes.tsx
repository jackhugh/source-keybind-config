export class BaseNode {
	value: string;
	children: BaseNode[] = [];
	parent?: BaseNode;

	constructor(value: string = '') {
		this.value = value;
	}
	addChildren(...children: BaseNode[]) {
		this.children.push(...children);
		children.forEach((child) => (child.parent = this));
	}
	get depth() {
		let depth = 0;
		const recursiveDepth = (currentNode: BaseNode) => {
			if (currentNode.parent) {
				depth++;
				recursiveDepth(currentNode.parent);
			}
		};
		recursiveDepth(this);
		return depth;
	}
	toString() {
		let output = `${'\t'.repeat(this.depth)}${this.value};\n`;
		this.children.forEach((child) => (output += child.toString()));
		return output;
	}
}

export class AliasNode extends BaseNode {
	name: string;
	commands: string[];

	constructor(name: string = '', commands: string[] = []) {
		super();
		this.name = name;
		this.commands = commands;

		this.commands.toString = () => this.commands.join('; ');
	}
	toString() {
		this.value = `alias ${this.name} "${this.commands}"`;
		return super.toString();
	}
}

export class BindNode extends BaseNode {
	bindKey: string;
	commands: string[];

	constructor(bindKey: string = '', commands: string[] = []) {
		super();
		this.bindKey = bindKey;
		this.commands = commands;

		this.commands.toString = () => this.commands.join('; ');
	}
	toString() {
		this.value = `bind ${this.bindKey} "${this.commands}"`;
		return super.toString();
	}
}
