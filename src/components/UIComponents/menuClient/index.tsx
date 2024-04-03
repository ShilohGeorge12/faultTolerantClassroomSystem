'use client';
import { useGlobals } from '@/context';
import { FaX } from 'react-icons/fa6';
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
		<section className='w-full h-10 md:hidden flex items-center justify-end pr-4'>
			<button
				type='button'
				name={`Toggle Menu Button`}
				className={``}
				onClick={onMenu}>
				{menu === 'close' ? <FiMenu className='text-xl' /> : <FaX />}
			</button>
		</section>
	);
}
