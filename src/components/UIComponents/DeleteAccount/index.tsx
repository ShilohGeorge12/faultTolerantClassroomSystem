'use client';

import { useRef, useState } from 'react';
import { deleteAccountAction, onLogoutAction } from '@/actions';
import type { sessionType } from '@/types';
import { AsideDrawer } from '../Drawer';
import { FaTrashCan } from 'react-icons/fa6';
import { FaSpinner } from 'react-icons/fa';

interface deleteAccountProps {
	session: sessionType | null;
}

export function DeleteAccount({ session }: deleteAccountProps) {
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');

	const onSubmit = async () => {
		setErrorMessage([]);
		const error = await deleteAccountAction({ userId: session ? session.user.userId : '' });
		if (error) {
			setStatus('idle');
			setErrorMessage([error]);
			return;
		}
		await onLogoutAction();
	};

	const triggerButton = (
		<button
			type='button'
			ref={closeBtnRef}
			name={`delete classroom`}
			className={`w-[60%] h-10 bg-gray-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500 text-white flex items-center justify-center transition-all duration-500 ease-in-out p-2 text-lg rounded-lg`}>
			<FaTrashCan />
		</button>
	);

	return (
		<>
			<AsideDrawer
				title={`Delete Account`}
				description='This action is inreversable'
				h='h-fit [40vh]'
				triggerButton={triggerButton}>
				<form className='size-full flex flex-col gap-10 items-center justify-center py-5 md:py-10'>
					<button
						type='button'
						name={`Delete`}
						className={`w-[90%] md:w-[55%] h-14 md:h-11 px-4 bg-red-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}
						disabled={status === 'fetching' ? true : false}>
						{status === 'idle' && 'Confirm Delete'}
						{status === 'fetching' && (
							<span className='animate-rotate'>
								<FaSpinner />
							</span>
						)}
					</button>

					{errorMessage.length > 0 && (
						<ul
							aria-errormessage='Login Validation Error Message'
							className='w-[90%] mx-auto flex flex-col gap-2 min-h-20 rounded-lg text-red-500 p-3 items-center'>
							{errorMessage.map((error) => (
								<li
									className='font-semibold tracking-wider capitalize'
									key={error}>
									{error}
								</li>
							))}
						</ul>
					)}
				</form>
			</AsideDrawer>
		</>
	);
}
