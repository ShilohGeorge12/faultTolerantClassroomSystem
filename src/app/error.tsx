'use client';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<AppLayout>
			<motion.section
				className='w-full h-full flex flex-col'
				initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
				animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
				exit={{ opacity: 0, translateZ: -100 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
				<MenuClient />
				<section className='w-full min-h-screen h-full flex items-center gap-4 justify-center'>
					<Image
						src='/images/error.png'
						className={`w-[30%] md:w-[15%] hover:scale-105 transition duration-300 ease-in-out`}
						loading='eager'
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
					</section>
				</section>
			</motion.section>
		</AppLayout>
	);
}
