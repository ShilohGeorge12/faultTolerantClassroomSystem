import Link from 'next/link';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';

export function Footer() {
	const h3Classess = 'font-bold text-md text-gray-600';
	const socialLInksAnimations = 'hover:scale-110 transition duration-500 ease-in-out';
	return (
		<footer className={`w-full min-h-40 bg-gray-200 grid grid-cols-2 md:grid-cols-3 md:p-12 px-4 py-12 text-xs`}>
			<div className='flex flex-col gap-1'>
				<h3 className={h3Classess}>About </h3>
				<nav className='space-y-2'>
					<Link
						href={'/aboutus'}
						className='hover:font-medium transition duration-500 hover:underline ease-in-out'>
						About CAS - Classroom Allocation System
					</Link>
					<p className=''>
						<span className='font-bold'>&copy;</span> 2024 Classroom Allocation Management System
					</p>
				</nav>
			</div>
			<div className='flex flex-col gap-1'>
				<h3 className={h3Classess}>Follow Us</h3>
				<nav className='flex gap-x-3 text-2xl text-black'>
					<Link
						href={'/#instagram'}
						className={socialLInksAnimations}>
						<AiOutlineInstagram />
					</Link>
					<Link
						href={'/#twitter'}
						className={socialLInksAnimations}>
						<AiOutlineTwitter />
					</Link>
					<Link
						href={'/#facebook'}
						className={socialLInksAnimations}>
						<FaFacebookF />
					</Link>
				</nav>
			</div>
		</footer>
	);
}
