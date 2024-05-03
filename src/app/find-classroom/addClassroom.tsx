'use client';

import { LOCATION_REGEX, NAME_REGEX, TAG_REGEX, isError, isMessage, responseTypes } from '@/types';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'sonner';

interface addClassroomProps {
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
	isDialogOpen: boolean;
}

export function AddClassroom({ isDialogOpen, setIsDialogOpen }: addClassroomProps) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [status, setStatus] = useState<'fetching' | 'idle'>('idle');
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const initState = {
		name: '',
		tag: '',
		location: '',
	};
	const [details, setDetails] = useState<typeof initState>(initState);

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isDialogOpen]);

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
		const formData = new FormData();
		const body = {
			name: details.name.trim(),
			location: details.location.trim(),
			tag: details.tag.trim(),
		};
		Object.entries(body).forEach(([key, val]) => formData.append(key, val));
		const req = await fetch('/api/classrooms', {
			method: 'POST',
			body: formData,
		});

		const res = (await req.json()) as unknown as responseTypes;
		if (isError(res)) {
			const error = typeof res.error === 'string' ? res.error : res.error.join(' ');
			toast.error(error);
			setStatus('idle');
			return;
		}

		if (isMessage(res)) {
			setStatus('idle');
			toast.success(res.message);
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<dialog
				ref={dialogRef}
				onClick={(e) => e.stopPropagation()}
				className='modal w-[95%] md:w-[55%] min-h-[70vh] text-sm rounded-2xl bg-white/70 backdrop-blur'>
				<section className='w-full flex-col flex md:gap-10 gap-10 p-3 relative'>
					<h4 className='font-semibold tracking-wider text-lg text-center capitalize'>Add a new classroom</h4>
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

					<section className='flex w-full h-full gap-8 flex-col items-center '>
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
							className={`button flex items-center justify-center w-1/2 md:w-1/3 h-10 rounded-xl bg-gray-200 text-gray-600 duration-500 ease-linear transition text-xl tracking-wider hover:text-white hover:bg-gray-500`}
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
							className='w-[90%] flex flex-col gap-2 min-h-20 rounded-lg text-red-500 p-3 items-center'>
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
