'use client';
import { useGlobals } from '@/context';
import { useParams } from 'next/navigation';
import { FaX } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export function ClassroomDetailsHeaderClient() {
	const params = useParams();
	const {
		state: { menu },
		dispatch,
	} = useGlobals();

	const onMenu = () => {
		menu === 'close' ? dispatch({ type: 'menu_open' }) : dispatch({ type: 'menu_close' });
	};

	return (
		<section className='flex justify-between items-center w-full px-4 pt-2'>
			<Link
				title={`back button`}
				className={`flex items-center justify-center bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-white rounded-lg transition ease-linear duration-500 text-base size-8`}
				href={`/classrooms/${params['page']}`}>
				<FaArrowLeft />
			</Link>
			<button
				type='button'
				name={`Toggle Menu Button`}
				className={`md:hidden block`}
				onClick={onMenu}>
				{menu === 'close' ? <FiMenu className='text-xl' /> : <FaX />}
			</button>
		</section>
	);
}
