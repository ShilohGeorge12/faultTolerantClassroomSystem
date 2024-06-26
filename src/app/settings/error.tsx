'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<motion.section
			className='w-full h-screen flex flex-col'
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<section className='w-full h-full flex items-center gap-4 justify-center'>
				<Image
					src='/images/error.png'
					className={`w-[30%] md:w-[15%] hover:scale-105 transition duration-300 ease-in-out`}
					title='error Something went wrong'
					alt='error Something went wrong'
					width={1000}
					height={1000}
				/>
				<hr className='w-1 md:h-40 h-36 rounded-xl bg-gray-300' />
				<section className='flex flex-col gap-4 items-center'>
					<p className='text-sm md:text-lg font-bold tracking-wider text-gray-500'>Something Went Wrong! </p>
					<button
						onClick={() => reset()}
						className={`w-[5.5rem] h-10 bg-gray-200 text-gray-500 hover:bg-gray-500 hover:text-white rounded-2xl ease-linear transition duration-300 hover:shadow-md hover:shadow-gray-500 hover:scale-105`}>
						Try again
					</button>
					<Link
						href={'/classrooms/1'}
						className={`px-3 flex items-center justify-center h-10 bg-blue-500 text-white rounded-2xl ease-linear transition-all duration-300 hover:shadow-md hover:shadow-blue-500 hover:scale-105`}>
						Back to home
					</Link>
				</section>
			</section>
		</motion.section>
	);
}
