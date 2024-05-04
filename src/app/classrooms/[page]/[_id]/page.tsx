import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import { MongoDB } from '@/db';
import { getSession } from '@/lib/sessions';
import { GoClock } from 'react-icons/go';
import { CLASSROOM } from '@/types';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { ClassroomUsageChart } from '@/components/UIComponents/charts';
import { Spinner } from '@/components/UIComponents/loadingSpinner';
import { validateBookings } from '@/components/functionalComponents/validateBookings';
import { BookingClient } from './bookingclient';
import { ClassroomDetailsHeaderClient } from './headerclient';
import { EditClassroom } from './editClassroom';

export default async function Home({ params: { _id } }: { params: { _id: string } }) {
	const classroom = await MongoDB.getClassroom().findOne({ _id });
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

	const bookings = classroom.bookings.map((booking) => {
		const bookingStartDate = new Date(booking.startDate);
		return bookingStartDate.toDateString();
	});

	const monday = bookings.filter((day) => day.includes('Mon')).length;
	const tueday = bookings.filter((day) => day.includes('Tue')).length;
	const wednesday = bookings.filter((day) => day.includes('Wed')).length;
	const thursday = bookings.filter((day) => day.includes('Thu')).length;
	const friday = bookings.filter((day) => day.includes('Fri')).length;

	const data = [monday, tueday, wednesday, thursday, friday];
	const classroomLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

	const ClassroomDetails = JSON.parse(JSON.stringify(classroom)) as unknown as CLASSROOM;

	return (
		<AppLayout>
			<section className='w-full h-full'>
				<ClassroomDetailsHeaderClient />
				<section className='w-full h-full flex flex-col py-4 px-4 gap-12'>
					<section className='grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-10 w-full h-[40%] justify-items-center'>
						<div className='flex items-center justify-center'>
							<Image
								src={'/classrooms/1.jpg'}
								alt={`classroom image`}
								className={`image w-[95%] md:w-[82%] rounded-2xl hover:shadow-lg hover:shadow-gray-400 hover:scale-105 transition duration-500 ease-linear`}
								width={10000}
								height={10000}
							/>
						</div>
						<div className='w-[95%] md:w-[82%] flex flex-col gap-4 bg-gray-200 p-3 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear relative'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Classroom Details</h3>
							<ul className='text-sm grid grid-cols-3 gap-3 pl-4'>
								<li className='font-medium'>Classroom Venue</li>
								<li className='font-light tracking-wide col-span-2'>{classroom.location}</li>
								<li className='font-medium'>Classroom Location</li>
								<li className='font-light tracking-wide col-span-2'>{classroom.name}</li>
								<li className='font-medium'>Classroom Status</li>
								<li className='font-light tracking-wide col-span-2'>{isOccupied ? 'Occupied' : 'Available'}</li>
								<li className='font-medium'>Digital Tag</li>
								<li className='font-light tracking-wide col-span-2'>{classroom.tag}</li>
							</ul>
							<EditClassroom
								session={session}
								classroom={ClassroomDetails}
							/>
							<BookingClient
								_id={classroom._id.toString()}
								isOccupied={isOccupied ? 'Occupied' : 'Available'}
								name={classroom.name}
								session={session}
							/>
						</div>
					</section>
					<section className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
						<section className='size-full flex flex-col items-center'>
							<h3 className='text-center text-xl font-medium tracking-wide'>Classroom Usage</h3>
							<div className='w-[95%] h-64 md:w-full md:h-[350px] font-semibold flex items-center justify-center'>
								<Suspense fallback={<Spinner />}>
									<ClassroomUsageChart
										data={data}
										labels={classroomLabels}
										classnames='size-full'
									/>
								</Suspense>
							</div>
						</section>
						<section className='size-full flex flex-col items-center gap-12'>
							<h3 className='text-center text-xl font-medium tracking-wide'>Booking History</h3>
							<ul className='w-[99%] md:w-[95%]'>
								{classroom.bookings.length > 0 &&
									classroom.bookings.map((booking) => (
										<li
											key={booking.createdAt.toString()}
											className='grid grid-cols-9 md:gap-4 gap-1 md:w-[90%] w-full justify-items-start transition-all duration-500 ease-in-out hover:scale-105 border-b pb-2 border-gray-300'>
											<span className='col-span-1 flex justify-start items-center text-xl text-gray-500'>
												<GoClock />
											</span>
											<div className='flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm'>Start date</h3>
												<p className='font-medium text-gray-400 text-sm flex justify-center md:justify-start w-full'>
													{booking.startDate.toString().replaceAll('-', '/')}
												</p>
											</div>
											<div className='flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm'>Start time</h3>
												<p className='font-medium text-gray-400 flex justify-center md:justify-start w-full'>{booking.startTime.toString()}</p>
											</div>
											<div className='flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm'>End date</h3>
												<p className='font-medium text-gray-400 flex justify-center md:justify-start w-full'>{booking.endDate.toString()}</p>
											</div>
											<div className='flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm'>End time</h3>
												<p className='font-medium text-gray-400 flex justify-center md:justify-start w-full'>{booking.endTime.toString()}</p>
											</div>
										</li>
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
			</section>
		</AppLayout>
	);
}
