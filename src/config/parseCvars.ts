import cvarString from './cvars';

export function parseCvars() {
	return cvarString
		.split('\n')
		.map((line) => line.split(':', 4).map((cell) => cell.trim()))
		.map(([cvar, type, flags, description]) => ({ cvar, type, flags, description }));
}
