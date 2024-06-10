'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { CLASSROOM, LOCATION_REGEX, NAME_REGEX, TAG_REGEX, sessionType } from '@/types';
import { FaEdit } from 'react-icons/fa';
import { onEditClassroomAction } from '@/actions';
import { AsideDrawer } from '@/components/UIComponents/Drawer';

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
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [details, setDetails] = useState<typeof initState>(initState);

	useEffect(() => {
		setDetails({
			name: classroom.name,
			location: classroom.location,
			tag: classroom.tag,
		});
	}, [classroom]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);
		const { name, location, tag } = details;
		if (name === classroom.name && location === classroom.location && tag === classroom.tag) {
			closeBtnRef.current?.click();
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
		closeBtnRef.current?.click();
		// refresh();
	};

	const triggerButton = (
		<button
			type='button'
			name={`edit classroom`}
			ref={closeBtnRef}
			className={`absolute bottom-5 right-4 bg-gray-500 text-white hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500 transition-all duration-500 ease-in-out p-2 text-base md:text-lg rounded-lg`}>
			<FaEdit />
		</button>
	);
	return (
		<>
			<AsideDrawer
				title={`Edit ${classroom.name}`}
				h='md:h-fit [71vh]'
				triggerButton={session && triggerButton}>
				<section className='w-full flex flex-col justify-center items-center gap-8 h-full mt-4 py-5 md:py-10'>
					<section className='w-full flex flex-col items-center justify-center gap-8'>
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
						className={`w-[90%] md:w-[64%] mx-auto h-12 md:h-11 px-4 bg-blue-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-sm md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}>
						Finalize Classroom Details
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
				</section>
			</AsideDrawer>
		</>
	);
}
