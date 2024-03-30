'use client';
import { useGlobals } from '@/context';
import { FiMenu } from 'react-icons/fi';

export function MenuClient() {
	const {
		state: { menu },
		dispatch,
	} = useGlobals();

	const onMenu = () => {
		menu === 'close' ? dispatch({ type: 'menu_open' }) : dispatch({ type: 'menu_close' });
	};

	return (
		<section className='w-full h-10 border border-blue-500 flex items-center justify-end pr-4'>
			<button
				type='button'
				name={`Toggle Menu Button`}
				className={``}
				onClick={onMenu}>
				<FiMenu className='text-xl' />
			</button>
		</section>
	);
}
