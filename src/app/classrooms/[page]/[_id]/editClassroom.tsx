'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { CLASSROOM, LOCATION_REGEX, NAME_REGEX, TAG_REGEX, sessionType } from '@/types';
import { FaEdit } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { onEditClassroomAction } from '@/actions';

interface EditClassroomProps {
	session: sessionType | null;
	classroom: CLASSROOM;
}

export function EditClassroom({ session, classroom }: EditClassroomProps) {
	const initState = {
		name: '',
		location: '',
		tag: '',
	};
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [details, setDetails] = useState<typeof initState>(initState);
	const { refresh } = useRouter();

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
		setDetails({
			name: classroom.name,
			location: classroom.location,
			tag: classroom.tag,
		});
	}, [isDialogOpen]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);
		const { name, location, tag } = details;
		if (name === classroom.name && location === classroom.location && tag === classroom.tag) {
			setIsDialogOpen(false);
			return;
		}

		let hasError: boolean = false;

		if (!NAME_REGEX.test(details.name)) {
			setErrorMessage((prev) => [...prev, `Classroom name (${name}) must be at least 2 characters long and can only contain letters, numbers and space.`]);
			hasError = true;
		}

		if (!LOCATION_REGEX.test(details.location)) {
			setErrorMessage((prev) => [...prev, `Classroom location must be 6-15 characters long and can only contan letters and space`]);
			hasError = true;
		}

		if (!TAG_REGEX.test(details.tag)) {
			setErrorMessage((prev) => [...prev, `Classroom Tag must be 8-10 characters long and can only contain letters, numbers and -`]);
			hasError = true;
		}
		if (hasError) return;

		const newName = details.name === classroom.name ? undefined : details.name;
		const newLocation = details.location === classroom.location ? undefined : details.location;
		const newTag = details.tag === classroom.tag ? undefined : details.tag;

		const error = await onEditClassroomAction({
			_id: classroom._id,
			newName,
			newLocation,
			newTag,
		});

		if (error) return setErrorMessage([error]);
		setDetails(initState);
		setIsDialogOpen(false);
		refresh();
	};

	return (
		<>
			{session && (
				<button
					type='button'
					name={`edit classroom`}
					className={`absolute bottom-5 right-4 bg-gray-300 text-gray-500 hover:text-white hover:bg-gray-400 transition-all duration-500 ease-in-out p-2 text-base md:ext-lg rounded-lg`}
					onClick={() => setIsDialogOpen(true)}>
					<FaEdit />
				</button>
			)}

			<dialog
				ref={dialogRef}
				onClick={(e) => e.stopPropagation()}
				className='modal w-[95%] md:w-[65%] min-h-[80vh] text-sm rounded-2xl bg-white/80 backdrop-blur'>
				<section className='w-full flex-col flex md:gap-20 gap-10 p-3 relative'>
					<h4 className='font-semibold tracking-wider text-base md:text-lg text-center capitalize'>Edit Classroom {classroom.tag}</h4>
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

					<section className='w-full flex flex-col items-center justify-center gap-8 mt-8'>
						<div className='w-[90%] h-11 flex items-center justify-center'>
							<input
								type='text'
								name='name'
								placeholder='classroom venue...'
								className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-600 font-semibold tracking-wider rounded-xl outline-0 focus:ring-4 ring-0 focus:ring-gray-300 hover:scale-105 transition-all duration-500 ease-in-out text-sm md:text-lg'
								value={details.name}
								onChange={onChange}
							/>
						</div>
						<div className='w-[90%] h-11 flex items-center justify-center'>
							<input
								type='text'
								name='location'
								placeholder='classroom location...'
								className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-600 font-semibold tracking-wider rounded-xl outline-0 focus:ring-4 ring-0 focus:ring-gray-300 hover:scale-105 transition-all duration-500 ease-in-out text-sm md:text-lg'
								value={details.location}
								onChange={onChange}
							/>
						</div>
						<div className='w-[90%] h-11 flex items-center justify-center'>
							<input
								type='text'
								name='tag'
								placeholder='classroom tag...'
								className='md:w-[70%] w-full h-full px-4 bg-gray-200 text-gray-600 font-semibold tracking-wider rounded-xl outline-0 focus:ring-4 ring-0 focus:ring-gray-300 hover:scale-105 transition-all duration-500 ease-in-out text-sm md:text-lg'
								value={details.tag}
								onChange={onChange}
							/>
						</div>
					</section>

					<button
						type='button'
						name={`finalize classroom details`}
						className={`w-[90%] md:w-[65%] mx-auto h-11 px-4 bg-blue-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-sm md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}>
						Finalize Classroom Details
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
