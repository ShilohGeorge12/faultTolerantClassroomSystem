'use client';

import type { classroomStatusType } from '@/types';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LuArrowBigDownDash } from 'react-icons/lu';

interface BookingClientProps {
	status: classroomStatusType;
	name: string;
}

interface bookingDetailsFROMType {
	date: string;
	time: string;
}
interface bookingDetailsTOType {
	date: string;
	time: string;
}

export const BookingClient = ({ status, name }: BookingClientProps) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
	const [fromBookingDetails, setFromBookingDetails] = useState<bookingDetailsFROMType>({ date: '', time: '00:00' });
	const [toBookingDetails, setToBookingDetails] = useState<bookingDetailsTOType>({ date: '', time: '' });

	const onInputChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFromBookingDetails((prev) => ({ ...prev, [name]: value }));
	};
	const onInputChangeTO = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setToBookingDetails((prev) => ({ ...prev, [name]: value }));
	};
	const onSubmit = () => {
		console.log({ from: fromBookingDetails, to: toBookingDetails });
	};

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isDialogOpen]);

	return (
		<>
			{status === 'FREE' && (
				<div className='flex items-center'>
					<button
						type='button'
						name={`Book This Classroom`}
						className={`w-40 h-9 rounded-xl hover:bg-gray-400 hover:text-white transition ease-linear duration-500 border-gray-400 text-gray-600 bg-gray-300`}
						onClick={() => setIsDialogOpen(true)}>
						Book This Classroom
					</button>
				</div>
			)}
			<dialog
				ref={dialogRef}
				className='w-[95%] md:w-[45%] min-h-[60vh] text-sm rounded-2xl bg-white/80 backdrop-blur'>
				<section className='w-full flex-col flex md:gap-16 p-3 relative'>
					<h4 className='font-semibold tracking-wider text-lg text-center capitalize'>Book {name}</h4>
					<button
						type='button'
						name={`close edit profile Modal`}
						className={`p-2 transition ease-linear duration-300 text-lg rounded-xl text-red-500 bg-red-200 hover:bg-red-500 hover:text-white absolute top-3 right-3`}
						onClick={() => setIsDialogOpen(false)}>
						<IoMdClose />
					</button>
					<div className='flex flex-col items-center justify-center gap-8'>
						<div className='w-[70%] h-fit flex items-center justify-between '>
							<input
								type='date'
								name='date'
								value={fromBookingDetails.date}
								onChange={(e) => onInputChangeFrom(e)}
								className='border border-gray-500 w-[45%] h-10 rounded-xl px-4'
							/>

							<input
								type='time'
								name='time'
								value={fromBookingDetails.time}
								onChange={(e) => onInputChangeFrom(e)}
								className='border border-gray-500 w-[45%] h-10 rounded-xl px-4'
							/>
						</div>

						<LuArrowBigDownDash className='text-3xl' />

						<div className='w-[70%] h-fit flex items-center justify-between '>
							<input
								type='date'
								name='date'
								value={toBookingDetails.date}
								onChange={(e) => onInputChangeTO(e)}
								className='border border-gray-500 w-[45%] h-10 rounded-xl px-4'
							/>

							<input
								type='time'
								value={toBookingDetails.time}
								name='time'
								onChange={(e) => onInputChangeTO(e)}
								className='border border-gray-500 w-[45%] h-10 rounded-xl px-4'
							/>
						</div>

						<button
							type='button'
							name={``}
							className={`w-1/3 h-10 rounded-xl bg-gray-200 text-gray-600 duration-500 ease-linear transition text-xl tracking-wider hover:text-white hover:bg-gray-500`}
							onClick={onSubmit}>
							Submit
						</button>
					</div>
				</section>
			</dialog>
		</>
	);
};
