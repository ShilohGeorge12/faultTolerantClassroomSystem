'use client';

import { useGlobals } from '@/context';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export function HomeClientHeader() {
	const {
		state: { user },
	} = useGlobals();

	return (
		<>
			<section className='w-full flex gap-2 items-center py-2 justify-between md:px-4 px-1'>
				<div className='md:w-1/4 flex items-center relative'>
					<input
						type='text'
						placeholder='Search...'
						title='Search for Classrooms'
						className='bg-gray-200 rounded-2xl placeholder:text-gray-400 placeholder:font-medium h-8 w-full px-4 outline-none hover:ring-1 transition duration-300 ease-linear focus:ring-2 ring-gray-200'
					/>
					<FaSearch className='text-sm absolute top-2 right-3 text-gray-400' />
				</div>
				<div className='flex items-center gap-1 hover:scale-105 transition duration-500 ease-in-out'>
					<Image
						src={`/images/user.png`}
						className='size-8'
						alt={`${user.username} profile picture`}
						width={100}
						height={100}
					/>
					<MdOutlineKeyboardArrowDown className='text-2xl text-gray-400' />
				</div>
			</section>
			<hr className='w-[95%] border-[1.5px] mt-1 rounded mx-auto' />
		</>
	);
}
