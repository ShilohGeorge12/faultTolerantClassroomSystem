'use client';

import { AsideDrawer } from '@/components/UIComponents/Drawer';
import { sessionType } from '@/types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

interface AddUserProps {
	session: sessionType | null;
}

export function AddUser({ session }: AddUserProps) {
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const { push } = useRouter();

	const onSubmit = async () => {
		setErrorMessage([]);
		closeBtnRef.current?.click();
	};

	const triggerButton = (
		<button
			type='button'
			ref={closeBtnRef}
			name={`delete classroom`}
			className={`w-[60%] h-10 bg-gray-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500 text-white flex items-center justify-center transition-all duration-500 ease-in-out text-base md:text-2xl rounded-lg`}>
			<FaUserPlus />
		</button>
	);

	return (
		<>
			<AsideDrawer
				title={`Add a new User`}
				h='h-[50vh]'
				triggerButton={session && triggerButton}>
				<section className='w-full flex flex-col justify-center items-center gap-4 h-full border border-red-500'>
					<div className='w-[90%] h-11 flex items-center justify-center'>
						<input
							type='text'
							name='username'
							placeholder='username...'
							className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg'
							// value={details.username}
							// onChange={onChange}
						/>
					</div>
					<div className='w-[90%] h-11 flex items-center justify-center'>
						<input
							type='text'
							name='username'
							placeholder='username...'
							className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg'
							// value={details.username}
							// onChange={onChange}
						/>
					</div>
				</section>
			</AsideDrawer>
		</>
	);
}
