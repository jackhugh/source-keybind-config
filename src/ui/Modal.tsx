import Button from './Button';

interface Props {
	closeModal: React.MouseEventHandler;
	children: React.ReactNode;
	className?: string;
}

export default function Modal({ closeModal, children, className }: Props) {
	return (
		<div>
			<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md'>
				<div className='flex flex-col items-center justify-center p-5 gap-5 bg-white rounded shadow'>
					<div className={className}>{children}</div>
					<Button onClick={closeModal} name='Ok' />
				</div>
			</div>
		</div>
	);
}
