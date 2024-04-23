import { Metadata } from 'next';
import { LoginClient } from './loginClient';
import { FaLaptop } from 'react-icons/fa6';

export const metadata: Metadata = {
	title: 'login',
	description: 'login into CAS to utilize its management features',
};

export default function Login() {
	return (
		<main className={`w-full h-screen flex flex-col p-4 items-center justify-center bg-gray-200`}>
			<section className='flex flex-col w-[95%] md:w-1/2 gap-10 md:gap-1 bg-white min-h-[85%] rounded-2xl items-center justify-center'>
				<div className='w-full flex items-end justify-center text-3xl font-semibold min-h-[5vh] md:min-h-[13vh]'>
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
