import { useEffect, useState } from 'react';
import { appendInfoToConfig, generateConfig } from '~/config/generateConfig';
import Button, { ButtonStates } from '~/ui/Button';
import Modal from '~/ui/Modal';
import { classnames } from '~/util';
import { BindInterface } from './Bind';
import SyntaxHighlighter from './SyntaxHighlighter copy';
// import CopyIcon from '~/icons/copy.svg';

interface Props {
	binds: BindInterface[];
	className?: string;
}

export default function ConfigView({ binds, className }: Props) {
	const [modalActive, setModalActive] = useState(false);
	const [text, setText] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		setUrl(window.location.href);
		setText(generateConfig(binds));
	}, [binds]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText('exec source-keybind-config.cfg;');
	};
	return (
		<>
			<div className={classnames('flex flex-col gap-5', className)}>
				<code
					style={{ tabSize: 2 }}
					className='whitespace-pre overflow-x-hidden overflow-ellipsis bg-gray-50 rounded p-4 border-2 text-gray-700'
				>
					<SyntaxHighlighter text={text} />
				</code>
				<a
					download='source-keybind-config.cfg'
					href={'data:,' + encodeURIComponent(appendInfoToConfig(text, url))}
				>
					<Button
						name={'Download'}
						state={ButtonStates.Success}
						onClick={() => {
							setModalActive(true);
						}}
					/>
				</a>
			</div>
			{modalActive && (
				<Modal closeModal={() => setModalActive(false)} className='flex flex-col gap-5'>
					<h2 className='text-2xl'>Instructions</h2>
					<ol className='list-decimal list-inside space-y-2'>
						<li>Move file to the same directory as your autoexec.cfg</li>
						<li>Add the following line to your autoexec</li>
						<div className='flex'>
							<code className='bg-gray-100 rounded p-2 block w-full'>
								exec source-keybind-config.cfg;
							</code>
							{/* <Button name={<CopyIcon width='20' height='20' />} onClick={copyToClipboard} /> */}
						</div>
					</ol>
				</Modal>
			)}
		</>
	);
}
