'use client';

import { usePathname } from 'next/navigation';
import { onLogoutAction } from '@/actions';
import { useGlobals } from '@/context';
import { UrlPath, sessionType } from '@/types';
import { motion } from 'framer-motion';
import { AuthButton, NavButton } from '../button';

import { FaLaptop } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { AiOutlineLogin } from 'react-icons/ai';

interface sideBarClientProps {
	session: sessionType | null;
}

export function SideBarClient({ session }: sideBarClientProps) {
	const pathname = usePathname();
	const dynamicClassroomRegex = /^\/classrooms\/\d+\/[^/]+$/;
	const dynamicHomeRegex = /^\/classrooms\/[^\/]+$/;
	const {
		state: { menu },
		dispatch,
	} = useGlobals();

	const isPath = (path: UrlPath, subPaths?: string) => {
		if (pathname === path || pathname.includes(path)) {
			return 'bg-blue-400 text-white';
		}
		return 'text-black';
	};

	const onClassroom = async () => {
		dispatch({ type: 'menu_close' });
	};

	const onFindClassroom = async () => {
		dispatch({ type: 'menu_close' });
	};

	const onAdmin = async () => {
		dispatch({ type: 'menu_close' });
	};

	const onSettings = async () => {
		dispatch({ type: 'menu_close' });
	};

	const onLogOut = async () => {
		dispatch({ type: 'menu_close' });
		await onLogoutAction();
	};

	const NavLayout = () => (
		<>
			<section
				id='top'
				className='md:h-[11%] h-[11%]'
			/>
			<nav
				id='navbuttons'
				className='w-full px-3 md:px-6 pt-2 h-5/6 flex items-center md:items-start flex-col gap-2 font-bold'>
				<NavButton
					name={`Classrooms`}
					more={`${isPath('/classrooms')}`}
					href='/'
					onClick={onClassroom}
					value={
						<>
							<FaLaptop className='text-lg' />
							<span className='hidden md:flex'>Classrooms</span>
						</>
					}
				/>

				{/* <NavButton
					name={`Find Classroom`}
					more={`${isPath('/find-classroom')}`}
					href='/find-classroom'
					onClick={onFindClassroom}
					value={
						<>
							<FaSearch className='text-base' />
							<span className='hidden md:flex'>Find Classroom</span>
						</>
					}
				/> */}

				{session && session.user.role === 'hoc' && (
					<NavButton
						name={`Settings`}
						more={`${isPath('/settings')}`}
						href='/settings'
						onClick={onSettings}
						value={
							<>
								<CiSettings className='text-xl' />
								<span className='hidden md:flex'>Settings</span>
							</>
						}
					/>
				)}

				{session && session.user.role === 'admin' && (
					<NavButton
						name={`Admin`}
						more={`${isPath('/admin')}`}
						href='/admin'
						onClick={onAdmin}
						value={
							<>
								<FaUser className='text-xl' />
								<span className='hidden md:flex'>Admin</span>
							</>
						}
					/>
				)}

				<section className={`w-full h-[100%] flex items-end justify-start `}>
					{session && (
						<AuthButton
							href={pathname}
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
						<AuthButton
							href={'/login'}
							name={'Log In Button'}
							islogin
							onClick={() => dispatch({ type: 'menu_close' })}
							value={
								<>
									<AiOutlineLogin className='text-lg' />
									<span className='hidden md:flex'>Login</span>
								</>
							}
						/>
					)}
				</section>
			</nav>
		</>
	);
	return (
		<>
			<aside className={`w-[15%] hidden md:block h-screen bg-gray-200 fixed`}>
				<NavLayout />
			</aside>

			<motion.aside
				initial={{ x: '-100vw', opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: '-100vw', opacity: 0 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
				className={`${
					menu === 'open' ? 'flex' : 'hidden'
				} z-20 md:hidden w-screen h-screen flex-col fixed top-0 left-0 bg-black/30 transition-all duration-300 ease-linear`}
				onClick={() => dispatch({ type: 'menu_close' })}>
				<motion.section
					initial={{ x: 0, opacity: 1 }} // Start visible and avoid unnecessary animation
					animate={{ x: 0, opacity: 1 }} // No animation needed when open
					exit={{ x: '-100vw', opacity: 0 }} // Animate out smoothly
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					onClick={(e) => e.stopPropagation()}
					className='w-[20%] h-full rounded-r-xl bg-white/85 backdrop-blur flex items-center justify-center'>
					<NavLayout />
				</motion.section>
			</motion.aside>
		</>
	);
}
