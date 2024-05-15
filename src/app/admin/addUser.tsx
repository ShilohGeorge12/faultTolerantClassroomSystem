'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX, USER_DB, sessionType } from '@/types';

import { AsideDrawer } from '@/components/UIComponents/Drawer';
import { FaEye, FaEyeSlash, FaSpinner, FaUserPlus } from 'react-icons/fa';
import { Select } from '@/components/UIComponents/select';
import { CreateUserAction } from '@/actions';
import { toast } from 'sonner';

interface AddUserProps {
	session: sessionType | null;
}

type InitState = Pick<USER_DB, 'username' | 'password' | 'role'> & { confirmPassword: string };

export function AddUser({ session }: AddUserProps) {
	const initState: InitState = {
		username: '',
		password: '',
		confirmPassword: '',
		role: 'hoc',
	};
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [details, setDetails] = useState<typeof initState>(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const Role: (USER_DB['role'] | string)[] = ['admin', 'hoc'];

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};
	const onSelectChange = (e: string) => {
		const role = e === 'hoc' ? e : 'admin';
		console.log(role);
		setDetails((prev) => ({ ...prev, role }));
	};

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};
	const onViewConfirmPassword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewConfirmPassword) {
			setViewConfirmPassword(false);
		} else {
			setViewConfirmPassword(true);
		}
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);

		const { username, confirmPassword, password, role } = details;

		if (!username || !password || !confirmPassword) {
			setErrorMessage(['all input fields should be filled correctly']);
			return;
		}

		let hasError: boolean = false;

		if (password !== confirmPassword) {
			setErrorMessage((prev) => [...prev, 'password and confirm Password must be the same']);
			hasError = true;
		}

		if (!USERNAME_REGEX.test(username)) {
			setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
			hasError = true;
		}

		if (!PASSWORD_REGEX.test(password)) {
			setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
			hasError = true;
		}

		if (hasError) return;
		setStatus('fetching');

		const error = await CreateUserAction({
			username,
			password,
			role,
		});

		if (error) {
			setErrorMessage([error]);
			setStatus('idle');
			return;
		}
		setStatus('idle');
		toast.success(`user with ${username} was successfully created`);
		setDetails(initState);
		closeBtnRef.current?.click();
	};

	const onClose = () => {
		setDetails(initState);
		setErrorMessage([]);
	};

	const triggerButton = (
		<button
			type='button'
			ref={closeBtnRef}
			name={`delete classroom`}
			onClick={onClose}
			className={`w-[60%] h-10 bg-gray-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500 text-white flex items-center justify-center transition-all duration-500 ease-in-out text-base md:text-2xl rounded-lg`}>
			<FaUserPlus />
		</button>
	);

	return (
		<>
			<AsideDrawer
				title={`Add a new User`}
				h='h-[91vh]'
				triggerButton={session && triggerButton}>
				<form
					onSubmit={onSubmit}
					className='w-full flex flex-col justify-center items-center gap-6 h-full'>
					<div className='w-[90%] h-11 flex items-center justify-center'>
						<input
							type='text'
							name='username'
							placeholder='username...'
							className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg'
							required
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
								required
								value={details.password}
								onChange={onChange}
							/>

							<button
								type='button'
								className={`absolute peer-hover:right-0 transition-all duration-500 ease-in-out text-gray-500 text-base right-3 bottom-3`}
								onClick={onViewPasword}>
								{viewPasword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>

					<div className='w-[90%] h-11 flex items-center justify-center'>
						<div className='md:w-[70%] w-full h-full relative'>
							<input
								type={viewConfirmPassword ? 'text' : 'password'}
								name='confirmPassword'
								placeholder='Confirm Password...'
								className='w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg peer'
								required
								value={details.confirmPassword}
								onChange={onChange}
							/>

							<button
								type='button'
								className={`absolute peer-hover:right-0 transition-all duration-500 ease-in-out text-gray-500 text-base right-3 bottom-3`}
								onClick={onViewConfirmPassword}>
								{viewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>

					<div className='w-[90%] md:w-[63%] h-11 flex items-center justify-center'>
						<Select
							options={Role}
							value={details.role}
							onChange={onSelectChange}
						/>
					</div>

					<button
						name={`finalize profile`}
						className={`w-[90%] md:w-[65%] h-11 px-4 bg-blue-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						disabled={status === 'fetching' ? true : false}>
						{status === 'idle' && 'Create User'}
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
