'use client';

import { usePathname } from 'next/navigation';
import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import { onEditProfileAction } from '@/actions';
import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX, USER_DB } from '@/types';
import { FaEdit, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { AsideDrawer } from '../Drawer';

interface EditProfileProps {
	userId: string;
	username: USER_DB['username'];
	role: USER_DB['role'];
}

export function EditProfile({ username, userId }: EditProfileProps) {
	const initState = {
		username,
		password: '',
		confirmPassword: '',
	};

	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [details, setDetails] = useState<typeof initState>(initState);
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [viewConfirmPasword, setViewConfirmPasword] = useState<boolean>(false);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const pathname = usePathname();

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};
	const onViewConfirmPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewConfirmPasword(false);
		} else {
			setViewConfirmPasword(true);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);

		if (details.username === username && details.password === '' && details.confirmPassword === '') {
			closeBtnRef.current?.click();
			return;
		}

		let hasError: boolean = false;
		if (details.username !== username && !USERNAME_REGEX.test(details.username)) {
			setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
			hasError = true;
		}

		if (details.password !== '' && !PASSWORD_REGEX.test(details.password)) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}
		if (details.confirmPassword !== '' && details.password !== '' && details.password !== details.confirmPassword) {
			setErrorMessage((prev) => [...prev, `password and confirm password don't match`]);
			hasError = true;
		}

		if (hasError) return;

		const newUsername = details.username === username ? undefined : details.username;
		const newPassword = details.password === '' ? undefined : details.password;

		const error = await onEditProfileAction({
			path: pathname,
			userId,
			newUsername,
			newPassword,
		});
		if (error) {
			setStatus('idle');
			setErrorMessage([error]);
			return;
		}
		setDetails(initState);
		closeBtnRef.current?.click();
	};

	const triggerButton = (
		<button
			type='button'
			ref={closeBtnRef}
			name={`edit profile`}
			className={`absolute top-4 right-4 bg-gray-100 text-gray-500 hover:text-white hover:bg-gray-500 transition-all duration-500 ease-in-out p-2 text-lg rounded-lg`}
			onClick={() => {
				setDetails(initState);
				setErrorMessage([]);
			}}>
			<FaEdit />
		</button>
	);

	return (
		<>
			<AsideDrawer
				title={`Edit your Profile`}
				h='h-fit [70vh]'
				triggerButton={triggerButton}>
				<form className='size-full flex flex-col gap-10 items-center justify-center py-5 md:py-10'>
					<section className='w-full flex flex-col items-center justify-center gap-8'>
						<div className='w-[90%] h-11 flex items-center justify-center'>
							<input
								type='text'
								name='username'
								placeholder='username...'
								className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg'
								value={details.username}
								onChange={onChange}
							/>
						</div>

						<div className='w-[90%] h-11 flex items-center justify-center'>
							<div className='md:w-[70%] w-full h-full relative'>
								<input
									type={viewPasword ? 'text' : 'password'}
									name='password'
									placeholder='password...'
									className='w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg peer'
									value={details.password}
									onChange={onChange}
								/>

								<button
									type='button'
									className={`absolute peer-hover:right-1 transition-all duration-500 ease-in-out text-gray-500 text-base right-3 bottom-3`}
									onClick={onViewPasword}>
									{viewPasword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						</div>

						<div className='w-[90%] h-11 flex items-center justify-center'>
							<div className='md:w-[70%] w-full h-full relative'>
								<input
									type={viewConfirmPasword ? 'text' : 'password'}
									name='confirmPassword'
									placeholder='confirm password...'
									className='w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg peer'
									value={details.confirmPassword}
									onChange={onChange}
								/>

								<button
									type='button'
									className={`absolute peer-hover:right-1 transition-all duration-500 ease-in-out text-gray-500 text-base right-3 bottom-3`}
									onClick={onViewConfirmPasword}>
									{viewConfirmPasword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						</div>
					</section>

					<button
						type='button'
						name={`finalize profile`}
						className={`w-[90%] md:w-[65%] h-14 md:h-11 px-4 bg-blue-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}
						disabled={status === 'fetching' ? true : false}>
						{status === 'idle' && 'Finalize Profile'}
						{status === 'fetching' && (
							<span className='animate-rotate'>
								<FaSpinner />
							</span>
						)}
					</button>

					{errorMessage.length > 0 && (
						<ul
							aria-errormessage='Login Validation Error Message'
							className='w-[90%] h-fit mx-auto flex flex-col gap-2 min-h-20 rounded-lg text-red-500 p-3 items-center'>
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
