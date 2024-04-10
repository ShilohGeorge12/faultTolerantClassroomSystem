'use client';

import { FaLaptop } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { AiOutlineLogin } from 'react-icons/ai';
import { AuthButton, NavButton } from '@/components/UIComponents/button';
// import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { UrlPath } from '@/types';
import { useGlobals } from '@/context';
import Link from 'next/link';

export default function ClientSideBar() {
	const pathname = usePathname();
	const { push } = useRouter();
	const {
		state: { loggedIn },
		dispatch,
	} = useGlobals();

	const isPath = (path: UrlPath, subPaths?: string) => {
		if (pathname === path) {
			//|| pathname.includes(subPaths)) {
			return 'bg-blue-400 text-white';
		}
		return 'text-black';
	};

	const onClassroom = async () => {
		push('/');
		dispatch({ type: 'menu_close' });
	};

	const onFindClassroom = async () => {
		push('/find-classroom');
		dispatch({ type: 'menu_close' });
	};
	const onSettings = async () => {
		// if (!loggedIn) return;
		push('/settings');
		dispatch({ type: 'menu_close' });
	};

	const onLogOut = async () => {
		dispatch({ type: 'menu_close' });
		// push('/');
	};

	return (
		<nav
			id='navbuttons'
			className='w-full pl-3 md:pl-6 pt-2 h-5/6 flex items-start flex-col gap-4 font-bold'>
			<NavButton
				name={`Classrooms`}
				more={`${isPath('/')}`}
				value={
					<>
						<FaLaptop className='text-lg' />
						<span className='hidden md:flex'>Classrooms</span>
					</>
				}
				onClick={onClassroom}
			/>
			<NavButton
				name={`Find Classroom`}
				more={`${isPath('/find-classroom')}`}
				value={
					<>
						<FaSearch className='text-base' />
						<span className='hidden md:flex'>Find Classroom</span>
					</>
				}
				onClick={onFindClassroom}
			/>
			<NavButton
				name={`Settings`}
				more={`${isPath('/settings')}`}
				value={
					<>
						<CiSettings className='text-xl' />
						<span className='hidden md:flex'>Settings</span>
					</>
				}
				onClick={onSettings}
			/>

			<section className='w-[80%] h-[63%] flex items-end justify-start'>
				{loggedIn && (
					<AuthButton
						name={`Log Out Button`}
						onClick={onLogOut}
						value={
							<>
								<MdOutlinePowerSettingsNew className='text-lg' />
								<span className='hidden md:flex'>Log Out</span>
							</>
						}
					/>
				)}

				{!loggedIn && (
					<Link
						href={'/login'}
						className='flex transition duration-500 ease-in-out hover:scale-105 p-2 rounded-lg gap-x-2 justify-center items-center text-sm bg-black hover:bg-blue-500 text-white'>
						<>
							<AiOutlineLogin className='text-lg' />
							<span className='hidden md:flex'>Login</span>
						</>
					</Link>
				)}
			</section>
		</nav>
	);
}
