'use client';

import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import { onEditProfileAction } from '@/actions';
import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX } from '@/types';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface EditProfileProps {
	username: string;
}

export function EditProfile({ username }: EditProfileProps) {
	const initState = {
		username,
		password: '',
	};
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [details, setDetails] = useState<typeof initState>(initState);
	const [viewPasword, setViewPasword] = useState<boolean>(false);

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isDialogOpen]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);

		if (details.username === username && details.password === '') {
			setIsDialogOpen(false);
			return;
		}

		let hasError: boolean = false;
		if (!USERNAME_REGEX.test(details.username)) {
			setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
			hasError = true;
		}
		if (!PASSWORD_REGEX.test(details.password)) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}
		if (hasError) return;

		const newUsername = details.username === username ? undefined : details.username;
		const newPassword = details.password === '' ? undefined : details.password;

		const error = await onEditProfileAction({
			username,
			newUsername,
			newPassword,
		});

		if (error) return setErrorMessage([error]);
		setDetails(initState);
		setIsDialogOpen(false);
	};
	return (
		<>
			<button
				type='button'
				name={`edit profile`}
				className={`absolute top-4 right-4 bg-gray-100 text-gray-500 hover:text-white hover:bg-gray-400 transition-all duration-500 ease-in-out p-2 text-lg rounded-lg`}
				onClick={() => setIsDialogOpen(true)}>
				<FaEdit />
			</button>

			<dialog
				ref={dialogRef}
				onClick={(e) => e.stopPropagation()}
				className='modal w-[95%] md:w-[65%] min-h-[80vh] text-sm rounded-2xl bg-white/70 backdrop-blur'>
				<section className='w-full flex-col flex md:gap-20 gap-10 p-3 justify-center items-center relative'>
					<h4 className='font-semibold tracking-wider text-lg text-center capitalize'>Edit your Profile</h4>
					<button
						type='button'
						name={`close popover`}
						className={`close p-2 transition ease-linear duration-300 text-lg rounded-xl text-red-500 bg-red-200 hover:bg-red-500 hover:text-white absolute top-3 right-3`}
						onClick={(e) => {
							setIsDialogOpen(false);
							e.stopPropagation();
						}}>
						<IoMdClose />
					</button>

					<section className='w-full flex flex-col items-center justify-center gap-8 mt-10'>
						<div className='w-[90%] h-11 flex items-center justify-center'>
							<input
								type='text'
								name='username'
								placeholder='username...'
								className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-lg'
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
									className='w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-lg peer'
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
					</section>

					<button
						type='button'
						name={`finalize profile`}
						className={`w-[90%] md:w-[65%] h-11 px-4 bg-blue-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-xl flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}
						// disabled={details.username === username || details.password === ''}
					>
						Finalize Profile
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
				</section>
			</dialog>
		</>
	);
}
