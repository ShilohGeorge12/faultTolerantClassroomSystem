'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteClassroomAction } from '@/actions';
import { FaTrashCan } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { TAG_REGEX } from '@/types';

export function DeleteClassroom() {
	const initState = {
		tag: '',
	};
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const [details, setDetails] = useState<typeof initState>(initState);
	const { refresh } = useRouter();

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isDialogOpen]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetails((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);
		const { tag } = details;

		if (tag === '') {
			setErrorMessage((prev) => [...prev, 'please provide the classroom special tag']);
			return;
		}

		if (!TAG_REGEX.test(tag)) {
			setErrorMessage((prev) => [...prev, `please provide a valid classroom tag`]);
			return;
		}

		const error = await deleteClassroomAction({ tag });
		if (error) return setErrorMessage([error]);
		setDetails(initState);
		setIsDialogOpen(false);
		refresh();
	};

	return (
		<>
			<button
				type='button'
				name={`delete classroom`}
				className={`w-[60%] h-10 bg-gray-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500 text-white flex items-center justify-center transition-all duration-500 ease-in-out p-2 text-lg rounded-lg`}
				onClick={() => setIsDialogOpen(true)}>
				<FaTrashCan />
			</button>

			<dialog
				ref={dialogRef}
				onClick={(e) => e.stopPropagation()}
				className='modal w-[95%] md:w-[65%] min-h-[50vh] text-sm rounded-2xl bg-white/60 backdrop-blur'>
				<form className='w-full flex-col flex gap-10 px-3 py-5 justify-center items-center relative'>
					<h4 className='font-semibold tracking-wider text-lg text-center capitalize'>Delete Classroom</h4>
					<button
						type='button'
						name={`close popover`}
						className={`close p-2 transition ease-linear duration-500 text-lg rounded-xl text-red-500 bg-red-200 hover:bg-red-500 hover:text-white absolute top-3 right-3`}
						onClick={(e) => {
							setIsDialogOpen(false);
							e.stopPropagation();
						}}>
						<IoMdClose />
					</button>

					<div className='w-full h-11 flex flex-col items-center justify-center gap-8 mt-10'>
						<input
							type='text'
							name='tag'
							placeholder='classroom special tag...'
							className='md:w-[65%] w-full h-full px-4 bg-gray-200 text-gray-400 font-semibold tracking-wider rounded-xl outline-0 focus:ring-4 ring-0 focus:ring-gray-200 hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg'
							value={details.tag}
							onChange={onChange}
						/>
					</div>

					<button
						type='button'
						name={`Delete`}
						className={`w-[90%] md:w-[65%] h-11 px-4 bg-red-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}>
						Delete
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
			</dialog>
		</>
	);
}
