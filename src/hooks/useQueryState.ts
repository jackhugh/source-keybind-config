import { useRouter } from 'next/router';
import pako from 'pako';
import { BindInterface } from '~/components/Bind';
import { base64ToBytes, bytesToBase64 } from '~/lib/base64Encode';
import { SetDataFunctionType } from '~/reducers/objectArrayReducer';
import { v4 as uuid } from 'uuid';

export function useQueryState(initialState: BindInterface[]) {
	const router = useRouter();

	const setBinds: SetDataFunctionType<BindInterface> = (setBindsFunction) => {
		router.replace({ query: { b: encodeBinds(setBindsFunction(binds)) } }, undefined, {
			shallow: true,
			scroll: false,
		});
	};

	let decodedBinds;
	try {
		decodedBinds = decodeBinds(String(router.query.b ?? ''));
	} catch (err) {}

	const binds = decodedBinds ?? initialState;

	return [binds, setBinds] as const;
}

// NOTE - testing new compression
// 1. convert object to array - will later pull un-needed values (eg. id), object will be able to be rebuilt using a version and schema
// 2. convert to JSON
// 3. zlib deflate compression
// 4. base64encode
// 5. replace invalid url characters (=+/)

function encodeBinds(binds: BindInterface[]): string {
	// const objectConversion = binds.map((bind) =>
	// 	Object.keys(bind)
	// 		.filter((key) => key !== 'id')
	// 		.map((key) => bind[key as keyof BindInterface])
	// );
	const objectConversion = binds.map((bind) => Object.values(bind));
	const json = JSON.stringify(objectConversion);
	const compressed = pako.deflate(json);
	const base64Encode = bytesToBase64(compressed);
	const urlConversion = base64Encode.replace(/\+/g, '.').replace(/\//g, '-').replace(/\=/g, '_');
	return urlConversion;
}

function decodeBinds(binds: string): BindInterface[] {
	const urlConversion = binds.replace(/\./g, '+').replace(/\-/g, '/').replace(/\_/g, '=');
	const base64Decode = base64ToBytes(urlConversion);
	const decompressed = pako.inflate(base64Decode, { to: 'string' });
	const jsonDecode = JSON.parse(decompressed) as CompressedBindType[];
	const objectConversion = jsonDecode.map((bind: CompressedBindType) => ({
		// id: uuid(),
		id: bind[0],
		defaultKey: bind[1],
		modifierKey: bind[2],
		defaultCommands: bind[3],
		modifierCommands: bind[4],
	}));
	return objectConversion;
}

type CompressedBindType = [
	BindInterface['id'],
	BindInterface['defaultKey'],
	BindInterface['modifierKey'],
	BindInterface['defaultCommands'],
	BindInterface['modifierCommands']
];
