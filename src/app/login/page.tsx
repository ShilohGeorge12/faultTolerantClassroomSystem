import Link from 'next/link';
import { Metadata } from 'next';
import { LoginClient } from './loginClient';
import { FaLaptop } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'login',
	description: 'login into CAS to utilize its management features',
};

export default function Login() {
	return (
		<main className={`w-full h-screen flex flex-col p-4 items-center justify-center bg-gray-200`}>
			<section className='flex flex-col w-[95%] md:w-1/2 gap-10 md:gap-1 bg-white min-h-[60%] md:min-h-[70%] rounded-2xl items-center justify-center relative'>
				<Link
					title={`back button`}
					className={`anchor flex items-center justify-center absolute top-2 left-2 md:top-4 md:left-4 bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-white rounded-xl transition ease-linear duration-500 text-base size-8`}
					href={`/`}>
					<FaArrowLeft />
				</Link>
				<div className='w-full flex items-end justify-center text-3xl font-semibold '>
					<h2 className='flex items-center justify-center gap-2'>
						<FaLaptop />
						<span className='tracking-widest'>CAS</span>
					</h2>
				</div>
				<LoginClient />
			</section>
		</main>
	);
}
