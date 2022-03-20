import { BindInterface } from '~/components/Bind';
import { BaseNode } from './nodes/BaseNodes';
import { ModifierBindNode } from './nodes/ModifierBindNode';
import { ModifierDefaultKeyBindsInterface } from './nodes/NodeTypes';

export function generateConfig(binds: BindInterface[]) {
	const commands: BaseNode[] = [];
	const modifierKeys = indexBinds(binds);

	for (const modifierKey in modifierKeys) {
		commands.push(new ModifierBindNode(modifierKey, modifierKeys[modifierKey]));
	}

	return commands.join('');
}

// TODO - trim whitespace etc...
function indexBinds(binds: BindInterface[]) {
	const indexed: ModifierDefaultKeyBindsInterface = {};
	binds.forEach((bind) => {
		indexed[bind.modifierKey] = indexed[bind.modifierKey] ?? {};
		indexed[bind.modifierKey][bind.defaultKey] = {
			defaultCommands: { press: bind.defaultCommands, release: addReleaseCommands(bind.defaultCommands) },
			modifierCommands: { press: bind.modifierCommands, release: addReleaseCommands(bind.modifierCommands) },
		};
	});
	return indexed;
}

function createReleaseCommand(command: string) {
	return !!command.match(/^\+/) ? command.replace(/^\+/, '-') : null;
}

function addReleaseCommands(commands: string[]) {
	const releaseCommands: string[] = [];
	commands.forEach((command) => {
		const release = createReleaseCommand(command);
		release && releaseCommands.push(release);
	});
	return releaseCommands;
}

export function appendInfoToConfig(config: string, url: string) {
	let text = '';
	text += '// Generated using https://github.com/jackhugh/source-keybind-config\n\n';
	text += '// Edit this config using the link below\n';
	text += `// ${url}\n\n`;
	text += config;
	return text;
}
