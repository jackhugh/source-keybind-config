import { GetStaticProps } from 'next';
import Bind from '~/components/Bind';
import ConfigView from '~/components/ConfigView';
import { SuggestionInterface } from '~/components/Suggestions';
import keys from '~/config/keys';
import { parseCvars } from '~/config/parseCvars';
import presets from '~/config/presets';
import { useQueryState } from '~/hooks/useQueryState';
import { objectArrayReducer } from '~/reducers/objectArrayReducer';
import Button from '~/ui/Button';

interface Props {
	cvars: SuggestionInterface[];
	keys: SuggestionInterface[];
}

export default function Index({ cvars, keys }: Props) {
	const [binds, setBinds] = useQueryState([presets.jumpthrow]);
	const bindActions = objectArrayReducer(setBinds, 'id');

	return (
		<div className='pt-10 flex'>
			<div className='shadow-xl rounded-2xl p-10 min-w-[80rem] m-auto bg-white max-w-[1280px]'>
				<h1 className='text-4xl font-semibold tracking-wide mb-7'>Source Engine Modifier Binds</h1>
				<div className='flex gap-5 items-start'>
					<div className='flex flex-col gap-5 flex-1'>
						{binds.map((bind, key) => (
							<Bind
								key={bind.id}
								bindData={bind}
								bindActions={bindActions}
								suggestionData={{ cvars, keys }}
								canRemove={binds.length > 1}
							/>
						))}
						<Button name='Add Bind' onClick={() => bindActions.add(presets.default)} className='self-end' />
					</div>
					{/* TODO - temp */}
					<div className='flex-1 w-[590px]'>
						<ConfigView binds={binds} />
					</div>
				</div>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
	props: {
		cvars: parseCvars().map((cvar) => ({ value: cvar.cvar, description: cvar.description })),
		keys: keys.map((key) => ({
			value: key.code,
			description: key.name,
		})),
	},
});
