'use client';

import { deleteClassroomAction } from '@/actions';
import { AsideDrawer } from '@/components/UIComponents/Drawer';
import { sessionType } from '@/types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';

interface DeleteClassroomProps {
	_id: string;
	name: string;
	session: sessionType | null;
}

export function DeleteClassroom({ _id, name, session }: DeleteClassroomProps) {
	const [errorMessage, setErrorMessage] = useState<string[]>([]);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const { push } = useRouter();

	const onSubmit = async () => {
		setErrorMessage([]);
		const error = await deleteClassroomAction({ _id });
		if (error) return setErrorMessage([error]);
		closeBtnRef.current?.click();
		push('/');
	};

	const triggerButton = (
		<button
			type='button'
			ref={closeBtnRef}
			name={`delete classroom`}
			className={`p-2 bg-gray-500 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500 text-white flex items-center justify-center transition-all duration-500 ease-in-out   text-base md:text-base rounded-lg absolute bottom-5 right-16`}>
			<FaTrashCan />
		</button>
	);
	return (
		<>
			<AsideDrawer
				title={`Delete ${name}`}
				description='This action is in-reversable'
				h='h-fit [50vh]'
				triggerButton={session && triggerButton}>
				<section className='w-full flex flex-col justify-center items-center gap-4 h-full py-5 md:py-10'>
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
					<button
						type='button'
						name={`Confirm Deletion of ${name}`}
						className={`w-[60%] md:w-[45%] h-11 px-4 bg-red-500 text-white hover:scale-105 transition-all duration-500 ease-in-out text-base md:text-lg flex items-center justify-center rounded-xl tracking-wider font-semibold`}
						onClick={onSubmit}>
						Confirm Delete
					</button>
				</section>
			</AsideDrawer>
		</>
	);
}
