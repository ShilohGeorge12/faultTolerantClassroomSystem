'use client';

import { Input } from '@/components/UIComponents/input';
import { useGlobals } from '@/context';
import { isClassroom, type responseTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LuArrowBigRightDash } from 'react-icons/lu';

interface BookingClientProps {
	name: string;
	_id: string;
	isOccupied: 'Occupied' | 'Available';
}

interface bookingDetails {
	date: string;
	time: string;
	dateTime: Date;
}

export const BookingClient = ({ name, _id, isOccupied }: BookingClientProps) => {
	const {
		state: { loggedIn },
	} = useGlobals();
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const initialDate = new Date();
	const { refresh } = useRouter();
	const [fromBookingDetails, setFromBookingDetails] = useState<bookingDetails>({ date: '', time: '', dateTime: initialDate });
	const [toBookingDetails, setToBookingDetails] = useState<bookingDetails>({ date: '', time: '', dateTime: initialDate });
	const [errorMessage, setErrorMessage] = useState<string[]>([]);

	const onChangeFrom = (dateTime: string) => {
		const date = dateTime.split(' ')[0];
		const time = dateTime.split(' ')[1];
		console.log(`from date: ${date}, time: ${time}`);
		setFromBookingDetails((prev) => ({ ...prev, date, time }));
	};
	const onChangeTo = (dateTime: string) => {
		const date = dateTime.split(' ')[0];
		const time = dateTime.split(' ')[1];
		console.log(`to date: ${date}, time: ${time}`);
		setToBookingDetails((prev) => ({ ...prev, date, time }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);
		if (fromBookingDetails.date === '' || fromBookingDetails.time === '') {
			setErrorMessage((prev) => [...prev, 'fill the start date and time details']);
		}

		if (toBookingDetails.date === '' || toBookingDetails.time === '') {
			setErrorMessage((prev) => [...prev, 'fill the end date and time details']);
			return;
		}

		const data = new FormData();
		const booking = {
			startDate: fromBookingDetails.date,
			endDate: toBookingDetails.date,
			startTime: fromBookingDetails.time,
			endTime: toBookingDetails.time,
			userId: '660e876c379f697ca786a06b',
		};

		Object.entries(booking).forEach(([key, val]) => data.append(key, val));
		const req = await fetch(`/api/classrooms/${_id}`, {
			method: 'POST',
			body: data,
		});
		const res = (await req.json()) as responseTypes;
		if (isClassroom(res)) {
			refresh();
			setIsDialogOpen(false);
			console.log({ from: fromBookingDetails, to: toBookingDetails });
		}
	};

	useEffect(() => {
		isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isDialogOpen]);

	return (
		<>
			{isOccupied === 'Available' && loggedIn && (
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
				onClick={(e) => e.stopPropagation()}
				className='modal w-[95%] md:w-[65%] min-h-[80vh] text-sm rounded-2xl bg-white/70 backdrop-blur'>
				<section className='w-full flex-col flex md:gap-20 gap-10 p-3 relative'>
					<h4 className='font-semibold tracking-wider text-lg text-center capitalize'>Book {name}</h4>
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
					<div className='flex items-center md:flex-row flex-col justify-center gap-4'>
						<div className='size-fit flex items-center justify-center text-sm'>
							<Input
								date={fromBookingDetails.dateTime}
								onChange={onChangeFrom}
							/>
						</div>

						<LuArrowBigRightDash className='text-3xl' />

						<div className='size-fit flex items-center justify-center'>
							<Input
								date={toBookingDetails.dateTime}
								onChange={onChangeTo}
							/>
						</div>
					</div>
					<div className='w-full flex items-center justify-center'>
						<button
							type='button'
							name={``}
							className={`button w-1/3 h-10 rounded-xl bg-gray-200 text-gray-600 duration-500 ease-linear transition text-xl tracking-wider hover:text-white hover:bg-gray-500`}
							onClick={onSubmit}>
							Submit
						</button>
					</div>

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
};
