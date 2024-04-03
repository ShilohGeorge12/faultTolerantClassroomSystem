'use client';

import { useGlobals } from '@/context';
import Image from 'next/image';
import { FaArrowDown, FaSearch } from 'react-icons/fa';

export function HomeClientHeader() {
	const {
		state: { user },
	} = useGlobals();

	return (
		<section className='w-full flex gap-2 items-center p-1 justify-between md:px-4 px-1'>
			<div className='md:w-1/4 flex items-center relative'>
				<input
					type='search'
					placeholder='Search...'
					title='Search for Classrooms'
					className='bg-gray-200 rounded-2xl placeholder:text-gray-400 placeholder:font-medium h-8 w-full px-2 outline-none focus:ring-2 ring-gray-200'
				/>
				<FaSearch className='text-sm absolute top-2 right-3 text-gray-400' />
			</div>
			<div className='flex items-center gap-2'>
				<Image
					src={`/images/user.png`}
					className='size-8'
					alt={`${user.username} profile picture`}
					width={100}
					height={100}
				/>
				<FaArrowDown className='text-gray-400' />
				{/*   search this one out */}
			</div>
		</section>
	);
}
