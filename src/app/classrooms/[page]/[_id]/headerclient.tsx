'use client';
import { useGlobals } from '@/context';
import { useParams, useRouter } from 'next/navigation';
import { FaX } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { SlRefresh } from 'react-icons/sl';
import Link from 'next/link';
// import { useEffect } from 'react';

export function ClassroomDetailsHeaderClient() {
	const params = useParams();
	const { refresh } = useRouter();
	const {
		state: { menu },
		dispatch,
	} = useGlobals();

	const onMenu = () => {
		menu === 'close' ? dispatch({ type: 'menu_open' }) : dispatch({ type: 'menu_close' });
	};

	// useEffect(() => {
	// 	const fetchDataInterval = setInterval(() => refresh(), 1800000); // 1800000 milliseconds = 30 minutes

	// 	return () => clearInterval(fetchDataInterval);
	// }, []);

	return (
		<section className='flex justify-between items-center w-full px-4 pt-2'>
			<Link
				title={`back button`}
				className={`anchor flex items-center justify-center bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-white rounded-lg transition ease-linear duration-500 text-base size-8`}
				href={`/classrooms/${params['page']}`}>
				<FaArrowLeft />
			</Link>
			<div className='flex gap-4'>
				<button
					type='button'
					name={`Refresh`}
					className={`refresh flex items-center justify-center bg-gray-200 font-semibold hover:bg-gray-500 text-gray-500 hover:text-white rounded-lg transition ease-linear duration-500 text-lg size-8`}
					onClick={() => refresh()}>
					<SlRefresh />
				</button>
				<button
					type='button'
					name={`Toggle Menu Button`}
					className={`menu-button md:hidden flex items-center justify-center bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-white rounded-lg transition ease-linear duration-500 text-base size-8`}
					onClick={onMenu}>
					{menu === 'close' ? <FiMenu className='text-xl' /> : <FaX />}
				</button>
			</div>
		</section>
	);
}
