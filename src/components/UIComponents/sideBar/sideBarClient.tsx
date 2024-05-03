'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { onLogoutAction } from '@/actions';
import { useGlobals } from '@/context';
import { UrlPath, sessionType } from '@/types';
import { AuthButton, NavButton } from '../button';

import { FaLaptop } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { AiOutlineLogin } from 'react-icons/ai';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

interface sideBarClientProps {
	session: sessionType | null;
}

export function SideBarClient({ session }: sideBarClientProps) {
	const pathname = usePathname();
	const { push } = useRouter();
	const {
		state: { menu },
		dispatch,
	} = useGlobals();

	const isPath = (path: UrlPath, subPaths?: string) => {
		if (pathname === path || pathname.includes(path)) {
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
		push('/settings');
		dispatch({ type: 'menu_close' });
	};

	const onLogOut = async () => {
		dispatch({ type: 'menu_close' });
		await onLogoutAction(); // push('/');
	};

	return (
		<>
			<aside className={`w-2/12 hidden md:block h-full bg-gray-200`}>
				<section
					id='top'
					className='md:h-[11%] h-[11%]'
				/>
				<nav
					id='navbuttons'
					className='w-full pl-3 md:pl-6 pt-2 h-5/6 flex items-start flex-col gap-2 font-bold'>
					<NavButton
						name={`Classrooms`}
						more={`${isPath('/classrooms')}`}
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
					{session && (
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
					)}

					<section className='w-[80%] h-[68%] flex items-end justify-start'>
						{session && (
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

						{!session && (
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
			</aside>
			<Drawer
				key={'menu_drawer'}
				open={menu === 'open'}
				onClose={() => dispatch({ type: 'menu_close' })}
				direction='left'
				size={'60px'}
				className='flex flex-col min gap-10 rounded-r-xl'>
				<section
					id='top'
					className='md:h-[11%] h-[11%]'
				/>
				<nav
					id='navbuttons'
					className='w-full pl-3 md:pl-6 pt-2 h-5/6 flex items-start flex-col gap-2 font-bold'>
					<NavButton
						name={`Classrooms`}
						more={`${isPath('/classrooms')}`}
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
					{session && (
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
					)}

					<section className='w-[80%] h-[68%] flex items-end justify-start'>
						{session && (
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

						{!session && (
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
			</Drawer>
		</>
	);
}
