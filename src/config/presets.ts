import { v4 as uuidv4 } from 'uuid';
import { BindInterface } from '~/components/Bind';

export default {
	get default(): BindInterface {
		return {
			id: uuidv4(),
			defaultKey: '',
			modifierKey: '',
			defaultCommands: [''],
			modifierCommands: [''],
		};
	},
	get jumpthrow(): BindInterface {
		return {
			id: uuidv4(),
			defaultKey: 'space',
			modifierKey: 'mouse5',
			defaultCommands: ['+jump'],
			modifierCommands: ['+jump', '-attack', '-attack2'],
		};
	},
};
