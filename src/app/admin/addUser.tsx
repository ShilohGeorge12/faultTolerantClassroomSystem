'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX, USER_DB, department, sessionType } from '@/types';

import { AsideDrawer } from '@/components/UIComponents/Drawer';
import { FaEye, FaEyeSlash, FaSpinner, FaUserPlus } from 'react-icons/fa';
import { Select } from '@/components/UIComponents/select';
import { CreateUserAction } from '@/actions';
import { toast } from 'sonner';

interface AddUserProps {
	session: sessionType | null;
}

type InitState = Pick<USER_DB, 'username' | 'password' | 'role' | 'department'> & { confirmPassword: string };

export function AddUser({ session }: AddUserProps) {
	const initState: InitState = {
		username: '',
		password: '',
		confirmPassword: '',
		role: 'hoc',
		department: 'computer science',
	};
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [details, setDetails] = useState<typeof initState>(initState);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const Role: { label: InitState['role']; value: InitState['role'] }[] = [
		{ label: 'admin', value: 'admin' },
		{ label: 'hoc', value: 'hoc' },
	];
	const Department: { label: InitState['department']; value: InitState['department'] }[] = [
		{ label: 'computer science', value: 'computer science' },
		{ label: 'cyber security', value: 'cyber security' },
		{ label: 'mass communication', value: 'mass communication' },
	];

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
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

		const { username, confirmPassword, password, role, department } = details;

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
			department,
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
				h='md:h-fit [80vh]'
				triggerButton={session && triggerButton}>
				<form
					onSubmit={onSubmit}
					className='w-full flex flex-col justify-center items-center md:gap-10 gap-6 py-5 md:py-10 h-full'>
					<section className='w-full grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center '>
						<div className='w-full h-11 flex items-center justify-center md:order-1'>
							<input
								type='text'
								name='username'
								placeholder='username...'
								className='md:w-[70%] w-[90%] h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-2xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg'
								required
								value={details.username}
								onChange={onChange}
							/>
						</div>

						<div className='w-full h-11 flex items-center justify-center md:order-3'>
							<div className='md:w-[70%] w-[90%] h-full relative'>
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

						<div className='w-full h-11 flex items-center justify-center md:order-5'>
							<div className='md:w-[70%] w-[90%] h-full relative'>
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

						<div className='w-[90%] md:w-[63%] h-11 flex items-center justify-center md:order-2'>
							<Select
								options={Role}
								value={details.role}
								onChange={(e) => setDetails((prev) => ({ ...prev, role: e }))}
							/>
						</div>

						<div className='w-[90%] md:w-[63%] h-11 flex items-center justify-center md:order-4'>
							<Select
								options={Department}
								value={details.department}
								onChange={(e) => setDetails((prev) => ({ ...prev, department: e }))}
							/>
						</div>
					</section>

					<button
						name={`finalize profile`}
						className={`w-[90%] md:w-[50%] h-12 md:h-11 px-4 bg-blue-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						disabled={status === 'fetching' ? true : false}>
						{status === 'idle' && 'Create User'}
						{status === 'fetching' && (
							<span className='animate-rotate'>
								<FaSpinner />
							</span>
						)}
					</button>

					{errorMessage.length > 0 && (
						<ul className='w-[90%] mx-auto flex flex-col gap-2 min-h-20 rounded-lg text-red-500 p-3 items-center'>
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
