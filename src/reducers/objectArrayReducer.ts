export type SetDataFunctionType<ObjectType> = (data: (prev: ObjectType[]) => ObjectType[]) => void;

export interface ObjectArrayReducerInterface<ObjectType extends object> {
	add: (newEntry: ObjectType) => void;
	set: (entry: ObjectType) => void;
	remove: (entry: ObjectType) => void;
}

export function objectArrayReducer<ObjectType extends object>(
	setData: SetDataFunctionType<ObjectType>,
	comparisionKey: keyof ObjectType
): ObjectArrayReducerInterface<ObjectType> {
	return {
		add(newEntry) {
			setData((prev) => [...prev, newEntry]);
		},
		set(entry) {
			setData((prev) => {
				const index = prev.findIndex((value: ObjectType) => value[comparisionKey] === entry[comparisionKey]);
				if (index + 1) {
					prev[index] = entry;
					return [...prev];
				}
				return prev;
			});
		},
		remove(entry) {
			setData((prev) => {
				const index = prev.findIndex((value) => value[comparisionKey] === entry[comparisionKey]);
				if (index + 1) {
					prev.splice(index, 1);
					return [...prev];
				}
				return prev;
			});
		},
	};
}
