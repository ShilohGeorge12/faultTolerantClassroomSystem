import Link from 'next/link';

export function Footer() {
	return (
		<footer className={`w-full min-h-40 bg-gray-300 grid grid-cols-3 p-12 text-xs`}>
			<div className='flex flex-col gap-1'>
				<h3 className='font-bold text-md'>About </h3>
				<nav className='pl-2 space-y-2'>
					<Link
						href={'/'}
						className=''>
						CAS - Classroom Allocation Management System
					</Link>
					<p className=''>
						<span className='font-bold text-md'>&copy;</span> 2024 Classroom Allocation Management System
					</p>
				</nav>
			</div>
			<h3 className=''>Follow Us</h3>
		</footer>
	);
}
