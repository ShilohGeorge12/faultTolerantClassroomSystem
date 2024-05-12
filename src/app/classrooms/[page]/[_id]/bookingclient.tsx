'use client';

import { bookClassroomAction } from '@/actions';
import { AsideDrawer } from '@/components/UIComponents/Drawer';
import { DatePickerWithRange } from '@/components/UIComponents/dateRangePicker';
import { TimeInput } from '@/components/UIComponents/timePicker';
import { sessionType } from '@/types';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface BookingClientProps {
	name: string;
	_id: string;
	isOccupied: 'Occupied' | 'Available';
	session: sessionType | null;
}

export const BookingClient = ({ name, _id, isOccupied, session }: BookingClientProps) => {
	const { push } = useRouter();
	const initialDate = new Date();
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const [date, setDate] = useState<DateRange | undefined>({
		from: initialDate,
		to: initialDate,
	});
	const [time, setTime] = useState<{ from: string; to: string }>({
		from: `${parseInt(initialDate.toTimeString().split(':')[0]) % 12}:${initialDate.toTimeString().split(':')[1].trim()}_${
			parseInt(initialDate.toTimeString().split(':')[0]) > 12 ? 'PM' : 'AM'
		}`,
		to: `${parseInt(initialDate.toTimeString().split(':')[0]) % 12}:${initialDate.toTimeString().split(':')[1]}_${
			parseInt(initialDate.toTimeString().split(':')[0]) > 12 ? 'PM' : 'AM'
		}`,
	});
	const [errorMessage, setErrorMessage] = useState<string[]>([]);

	const onChangeFrom = (time: string) => {
		setTime((prev) => ({ ...prev, from: time }));
	};
	const onChangeTo = (time: string) => {
		setTime((prev) => ({ ...prev, to: time }));
	};

	const onSubmit = async () => {
		setErrorMessage([]);

		if (!date) {
			setErrorMessage((prev) => [...prev, 'fill in the booking date']);
			return;
		}

		if (!date.from || !date.to) {
			setErrorMessage((prev) => [...prev, 'fill in the booking date details']);
			return;
		}

		if (time.from === time.to) {
			setErrorMessage((prev) => [...prev, 'fill in the booking time details']);
			return;
		}

		const booking = {
			startDate: date.from,
			endDate: date.to,
			startTime: time.from.replaceAll('_', ' '),
			endTime: time.to.replaceAll('_', ' '),
			userId: session ? session.user.userId : '', //'660e876c379f697ca786a06b',
			_id,
		};

		const error = await bookClassroomAction(booking);
		if (error) return setErrorMessage([error]);
		closeBtnRef.current?.click();
		console.log({ date, time });
	};

	const triggerButton = (
		<div className='flex items-center'>
			<button
				type='button'
				ref={closeBtnRef}
				name={`Book This Classroom`}
				className={`w-1/2 h-9 rounded-xl hover:bg-gray-400 hover:text-white transition ease-linear duration-500 border-gray-400 text-gray-600 bg-gray-300`}>
				Book This Classroom
			</button>
		</div>
	);
	return (
		<>
			<AsideDrawer
				title={`Book ${name}`}
				h='h-[65vh]'
				triggerButton={isOccupied === 'Available' && session && triggerButton}>
				<section className='w-full h-full flex-col flex items-center justify-end md:gap-6 gap-10 p-3'>
					<section className='w-[80%] flex md:flex-row flex-col items-centers justify-evenly gap-1 mt-5'>
						<div className='w-full flex items-center flex-col justify-end py-2 gap-2'>
							<label
								htmlFor='dates'
								className='md:w-4/5 w-full font-medium tracking-wide'>
								Pick your dates
							</label>
							<div className='md:w-4/5 w-full h-14 md:h-24 flex items-center justify-center text-sm'>
								<DatePickerWithRange
									className={`w-full h-full text-2xl`}
									date={date}
									id='dates'
									setDate={setDate}
								/>
							</div>
						</div>

						<div className='w-full flex flex-col justify-center items-center gap-4 py-2'>
							<div className='w-full flex items-center flex-col justify-center gap-1'>
								<label
									htmlFor=''
									className='md:w-4/5 w-full font-medium tracking-wide'>
									Pick your start Time
								</label>
								<div className='md:w-4/5 w-full h-11 flex  items-center justify-center gap-4 text-sm'>
									<TimeInput
										value={time.from}
										setTimeChange={onChangeFrom}
									/>
								</div>
							</div>
							<div className='w-full flex items-center flex-col justify-center gap-1'>
								<label
									htmlFor=''
									className='md:w-4/5 w-full font-medium tracking-wide'>
									Pick your end Time
								</label>
								<div className='md:w-4/5 w-full h-11 flex items-center justify-center gap-4 text-sm'>
									<TimeInput
										value={time.to}
										setTimeChange={onChangeTo}
									/>
								</div>
							</div>
						</div>
					</section>

					<div className='w-full flex items-center justify-center'>
						<button
							type='button'
							name={`submit`}
							className={`button w-[80%] md:w-1/3 h-10 rounded-xl bg-blue-500 text-white duration-300 ease-linear transition text-xl tracking-wider hover:scale-105`}
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
			</AsideDrawer>
		</>
	);
};
