import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MongoDB } from '@/db';
import { getSession } from '@/lib/sessions';
import { CLASSROOM } from '@/types';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { onGoingBooking, validateBookings } from '@/components/functionalComponents/validateBookings';
import { BookingClient } from './bookingclient';
import { ClassroomDetailsHeaderClient } from './headerclient';
import { EditClassroom } from './editClassroom';
import { DeleteClassroom } from './deleteClassroom';
import { List } from './list';

export default async function Home({ params: { _id } }: { params: { _id: string } }) {
	const classroom = await MongoDB.getClassroom().findOne({ _id }).populate('bookings.userId').select('-password');
	if (!classroom) notFound();

	const today = new Date();
	const session = await getSession();
	const isOccupied = validateBookings(classroom.bookings, today);

	if (!isOccupied) {
		classroom.status = 'FREE';
		classroom.save();
	} else {
		classroom.status = 'IN USE';
		classroom.save();
	}

	const ClassroomDetails = JSON.parse(JSON.stringify(classroom)) as unknown as CLASSROOM;
	const ongoingBooking = onGoingBooking(classroom.bookings, today);

	const bookingHistory =
		classroom.bookings.length >= 10
			? classroom.bookings.length >= 20
				? classroom.bookings.slice(classroom.bookings.length / 2, classroom.bookings.length)
				: classroom.bookings.slice(classroom.bookings.length - 8, classroom.bookings.length)
			: classroom.bookings;

	const upcomingBookingsToday = classroom.bookings
		.map((booking) => {
			const bookingDate = new Date(booking.date);
			const startTime = new Date(booking.startTime);

			// Set both dates to midnight to compare only the dates, ignoring the time
			const todayMidnight = new Date(today);
			todayMidnight.setHours(0, 0, 0, 0);
			const bookingDateMidnight = new Date(bookingDate);
			bookingDateMidnight.setHours(0, 0, 0, 0);

			const todayTimeMinutes = today.getHours() * 60 + today.getMinutes();
			const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();

			// Compare dates using timestamps
			const isSameDate = bookingDateMidnight.getTime() === todayMidnight.getTime();

			// Calculate the difference between the booking time and current time in minutes
			const timeDifference = isSameDate ? startTimeMinutes - todayTimeMinutes : Infinity;

			return {
				booking,
				timeDifference,
			};
		})
		.filter((bookingObj) => bookingObj.timeDifference >= 0 && bookingObj.timeDifference !== Infinity)
		.sort((a, b) => a.timeDifference - b.timeDifference);

	return (
		<AppLayout>
			<section className='w-full h-full'>
				<ClassroomDetailsHeaderClient />
				<section className='w-full h-full flex flex-col py-4 px-4 gap-10 md:gap-12'>
					<section className='grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-10 w-full md:h-[300px] justify-items-center'>
						<div className='flex items-centers justify-center'>
							<Image
								src={'/classrooms/1.jpg'}
								alt={`classroom image`}
								className={`image w-[95%] md:w-[82%] rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition duration-300 ease-linear`}
								width={10000}
								height={10000}
							/>
						</div>
						<div className='w-[98%] md:w-[82%] h-[300px] md:h-full flex flex-col gap-4 bg-gray-200 p-3 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-300 ease-linear relative'>
							<h3 className='text-xl font-semibold text-center tracking-wider'>Classroom Details</h3>
							<ul className='text-sm grid grid-cols-7 gap-3 pl-4'>
								<li className='font-semibold col-span-3'>Classroom Venue</li>
								<li className='font-light tracking-wide col-span-4'>{classroom.location}</li>
								<li className='font-semibold col-span-3'>Classroom Location</li>
								<li className='font-light tracking-wide col-span-4'>{classroom.name}</li>
								<li className='font-semibold col-span-3'>Classroom Status</li>
								<li className='font-medium tracking-wide col-span-4'>{isOccupied ? 'Occupied' : 'Available'}</li>
								<li className='font-semibold col-span-3'>Digital Tag</li>
								<li className='font-light tracking-wide col-span-4'>{classroom.tag}</li>
							</ul>

							{session && session.user.role === 'admin' && (
								<EditClassroom
									session={session}
									classroom={ClassroomDetails}
								/>
							)}
							<BookingClient
								_id={classroom._id.toString()}
								isOccupied={isOccupied ? 'Occupied' : 'Available'}
								name={classroom.name}
								session={session}
							/>
							{session && session.user.role === 'admin' && (
								<DeleteClassroom
									session={session}
									_id={classroom._id.toString()}
									name={classroom.name}
								/>
							)}
						</div>
					</section>

					<section className='w-full h-fit flex flex-col items-center gap-4'>
						<h3 className='text-center text-xl font-semibold tracking-wide'>OnGoing Booking</h3>
						<ul className='w-full max-h-[500px] pb-2 overflow-hidden overflow-y-auto  flex flex-col items-center gap-6'>
							{ongoingBooking.length > 0 &&
								ongoingBooking.map((booking) => (
									<List
										key={new Date(booking.createdAt).toString()}
										booking={booking}
									/>
								))}

							{ongoingBooking.length === 0 && (
								<li className='gap-4 md:w-[90%] flex items-center justify-center text-base transition-all duration-500 ease-in-out border-b pb-2 border-gray-300'>
									There are no ongoing bookings today
								</li>
							)}
						</ul>
					</section>

					<section className='w-full h-fit flex flex-col items-center gap-4'>
						<h3 className='text-center text-xl font-semibold tracking-wide'>Upcoming Bookings Today</h3>
						<ul className='w-full max-h-[500px] pb-2 overflow-hidden overflow-y-auto  flex flex-col items-center gap-6'>
							{classroom.bookings.length > 0 &&
								upcomingBookingsToday.map(({ booking }) => (
									<List
										key={new Date(booking.createdAt).toString()}
										booking={booking}
									/>
								))}

							{upcomingBookingsToday.length === 0 && (
								<li className='gap-4 md:w-[90%] flex items-center justify-center text-base transition-all duration-500 ease-in-out border-b pb-2 border-gray-300'>
									There are no upcoming bookings today
								</li>
							)}
						</ul>
					</section>

					<section className='w-full h-fit flex flex-col items-center gap-4'>
						<h3 className='text-center text-xl font-semibold tracking-wide'>Booking History</h3>
						<ul className='w-full max-h-[530px] pb-4 overflow-hidden overflow-y-auto flex flex-col items-center gap-6'>
							{classroom.bookings.length > 0 &&
								bookingHistory.map((booking) => (
									<List
										key={new Date(booking.createdAt).toString()}
										booking={booking}
										showDate
									/>
								))}

							{classroom.bookings.length === 0 && (
								<li className='gap-4 md:w-[90%] flex items-center justify-center text-base transition-all duration-500 ease-in-out border-b pb-2 border-gray-300'>
									Booking history is empty
								</li>
							)}
						</ul>
					</section>
				</section>
			</section>
		</AppLayout>
	);
}
