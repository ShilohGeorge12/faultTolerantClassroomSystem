'use client';

import { LOCATION_REGEX, NAME_REGEX, TAG_REGEX } from '@/types';
import { AsideDrawer } from '@/components/UIComponents/Drawer';
import { sessionType } from '@/types';
import { ChangeEvent, useRef, useState } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { AddClassroomAction } from '@/actions';

interface AddUserProps {
	session: sessionType | null;
}

export function AddClassroom({ session }: AddUserProps) {
	const initState = {
		name: '',
		tag: '',
		location: '',
	};
	const [details, setDetails] = useState<typeof initState>(initState);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);
		const { name, location, tag } = details;
		if (name === '' || location === '' || tag === '') {
			setErrorMessage((prev) => [...prev, 'All Input Fields are required!!']);
			return;
		}

		let hasError: boolean = false;

		if (!NAME_REGEX.test(name)) {
			setErrorMessage((prev) => [...prev, `Classroom name (${name}) must be at least 2 characters long and can only contain letters, numbers and space.`]);
			hasError = true;
		}

		if (!LOCATION_REGEX.test(location)) {
			setErrorMessage((prev) => [...prev, `Classroom location must be 6-15 characters long and can only contan letters and space`]);
			hasError = true;
		}

		if (!TAG_REGEX.test(tag)) {
			setErrorMessage((prev) => [...prev, `Classroom Tag must be 8-10 characters long and can only contain letters, numbers and -`]);
			hasError = true;
		}

		if (hasError) return;
		setStatus('fetching');
		const body = {
			name: details.name.trim(),
			location: details.location.trim(),
			tag: details.tag.trim(),
		};

		const error = await AddClassroomAction(body);
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
			name={`add classroom`}
			onClick={() => setDetails(initState)}
			className={`w-[60%] h-10 bg-gray-500 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500 text-white flex items-center justify-center transition-all duration-500 ease-in-out text-base md:text-2xl rounded-lg`}>
			<FaPlus />
		</button>
	);

	return (
		<>
			<AsideDrawer
				title={`Add a new Classroom`}
				h='h-[77vh]'
				triggerButton={session && triggerButton}>
				<section className='size-full flex flex-col gap-8 items-center justify-center'>
					<section className='w-full md:w-[80%] flex flex-col gap-6 items-center'>
						<div className='w-[90%] md:w-[60%] h-10 flex items-center justify-center'>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Name..'
								className='size-full rounded-lg bg-gray-200 text-gray-500 tracking-wider text-base placeholder-gray-500 outline-0 py-2 px-4 hover:scale-105 focus:ring-2 ring-gray-200 transition-all duration-500'
								value={details.name}
								onChange={onChange}
								disabled={status === 'fetching' ? true : false}
							/>
						</div>
						<div className='w-[90%] md:w-[60%] h-10 flex items-center justify-center'>
							<input
								type='text'
								name='location'
								id='location'
								placeholder='Location..'
								className='size-full rounded-lg bg-gray-200 text-gray-500 tracking-wider text-base placeholder-gray-500 outline-0 py-2 px-4 hover:scale-105 focus:ring-2 ring-gray-200 transition-all duration-500'
								value={details.location}
								onChange={onChange}
								disabled={status === 'fetching' ? true : false}
							/>
						</div>
						<div className='w-[90%] md:w-[60%] h-10 flex items-center justify-center'>
							<input
								type='text'
								name='tag'
								id='tag'
								placeholder='Special tag..'
								className='size-full rounded-lg bg-gray-200 text-gray-500 tracking-wider text-base placeholder-gray-500 outline-0 py-2 px-4 hover:scale-105 focus:ring-2 ring-gray-200 transition-all duration-500'
								value={details.tag}
								onChange={onChange}
								disabled={status === 'fetching' ? true : false}
							/>
						</div>
					</section>

					<div className='w-full flex items-center justify-center'>
						<button
							type='button'
							name={`Add Classroom`}
							className={`button flex items-center justify-center w-1/2 md:w-1/3 h-10 rounded-xl bg-blue-500 text-white duration-500 ease-linear transition text-xl tracking-wider hover:scale-105`}
							onClick={onSubmit}
							disabled={status === 'fetching' ? true : false}>
							{status === 'idle' && 'Submit'}
							{status === 'fetching' && (
								<span className='animate-rotate'>
									<FaSpinner />
								</span>
							)}
						</button>
					</div>

					{errorMessage.length > 0 && (
						<ul
							aria-errormessage='Login Validation Error Message'
							className={`w-[90%] flex flex-col gap-2 ${errorMessage.length <= 2 ? 'min-h-10' : 'min-h-20'} rounded-lg text-red-500 p-3 items-center `}>
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
			</AsideDrawer>
		</>
	);
}
