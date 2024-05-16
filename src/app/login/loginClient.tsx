'use client';

import { onLoginAction } from '@/actions';
import { useGlobals } from '@/context';
import { PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX } from '@/types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, MouseEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export function LoginClient() {
	const initState = {
		username: '',
		password: '',
	};
	const { dispatch } = useGlobals();
	const { push } = useRouter();
	const [details, setDetails] = useState<typeof initState>(initState);
	const [viewPasword, setViewPasword] = useState<boolean>(false);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const [errorMessage, setErrorMessage] = useState<string[]>([]);

	const onViewPasword = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (viewPasword) {
			setViewPasword(false);
		} else {
			setViewPasword(true);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage([]);
		const { username, password } = details;
		if (username === '' || password === '') {
			setErrorMessage((prev) => [...prev, 'All Input Fields are required!!']);
			return;
		}

		let hasError: boolean = false;

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
		const loginError = await onLoginAction({ username: username.trim() });
		if (loginError) {
			setStatus('idle');
			setErrorMessage(['invalid login credentials']);
			return;
		}
		setStatus('idle');
		push('/classrooms/1');
	};

	return (
		<>
			<form
				onSubmit={onSubmit}
				className='w-full flex flex-col gap-6 md:gap-8'>
				<div className='w-full flex flex-col items-center justify-center gap-1'>
					<label
						htmlFor='username'
						className='w-[260px] md:w-[460px] text-sm md:text-base pl-2 text-gray-500 tracking-wider font-medium'>
						Username
					</label>
					<input
						type='text'
						id='username'
						name='username'
						placeholder='username...'
						required
						className='py-2 px-4 placeholder-gray-500 placeholder:text-base tracking-wider text-gray-600 text-base md:text-xl rounded-xl bg-gray-200 w-[260px] md:w-[460px] h-10 outline-0 hover:scale-105 focus:scale-105 transition-all duration-500 ease-in-out focus:ring-2 ring-gray-200'
						value={details.username}
						onChange={onChange}
						disabled={status === 'fetching' ? true : false}
					/>
				</div>
				<div className='w-fit mx-auto  flex flex-col items-center justify-center gap-1 relative'>
					<label
						htmlFor='password'
						className='w-[260px] md:w-[460px] text-sm md:text-base pl-2 text-gray-500 tracking-wider font-medium'>
						Password
					</label>
					<input
						type={viewPasword ? 'text' : 'password'}
						id='password'
						name='password'
						placeholder='password...'
						required
						className='peer py-2 px-4 placeholder-gray-500 placeholder:text-base tracking-wider text-gray-600 text-base md:text-xl rounded-xl bg-gray-200 w-[260px] md:w-[460px] h-10 outline-0 hover:scale-105 focus:scale-105 transition-all duration-500 ease-in-out focus:ring-2 ring-gray-200'
						value={details.password}
						onChange={onChange}
						disabled={status === 'fetching' ? true : false}
					/>
					<button
						type='button'
						className={`absolute peer-hover:right-1 transition-all duration-500 ease-in-out text-gray-500 text-base right-3 bottom-3`}
						onClick={onViewPasword}>
						{viewPasword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>
				<div className=' w-full flex items-end'>
					<button
						name={`login into FTCAS`}
						className={`flex items-center justify-center bg-blue-500 text-white h-10 w-[260px] md:w-[460px] mx-auto rounded-xl text-base md:text-lg font-medium tracking-wider transition-all duration-500 ease-in-out hover:scale-105`}
						disabled={status === 'fetching' ? true : false}>
						{status === 'idle' && 'Log In'}
						{status === 'fetching' && (
							<span className='animate-rotate'>
								<FaSpinner />
							</span>
						)}
					</button>
				</div>
			</form>

			{errorMessage.length > 0 && (
				<ul className='w-[90%] flex flex-col gap-2 min-h-20 text-center rounded-lg text-red-500 p-3 items-center'>
					{errorMessage.map((error) => (
						<li
							className='font-semibold tracking-wider capitalize'
							key={error}>
							{error}
						</li>
					))}
				</ul>
			)}
		</>
	);
}
