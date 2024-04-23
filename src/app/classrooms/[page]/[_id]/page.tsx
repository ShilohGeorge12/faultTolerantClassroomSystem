import { AppLayout } from '@/components/UIComponents/appLayout';
import { MongoDB } from '@/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BookingClient } from './bookingclient';
import { ClassroomUsageChart } from '@/components/UIComponents/charts';
import { ClassroomDetailsHeaderClient } from './headerclient';
import { isBefore } from 'date-fns';
import { CLASSROOMBOOKING } from '@/types';
import { Spinner } from '@/components/UIComponents/loadingSpinner';
import { Suspense } from 'react';

export default async function Home({ params: { _id } }: { params: { _id: string } }) {
	const classroom = await MongoDB.getClassroom().findOne({ _id });
	if (!classroom) notFound();

	const data = [15, 10, 8, 12, 5];
	const classroomLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

	const today = new Date();

	const latestbooking =
		classroom.bookings.length > 0 &&
		classroom.bookings.reduce((latest, booking) => {
			const bookingStartDate = new Date(booking.startDate);
			const bookingEndDate = new Date(booking.endDate);
			const bookingCreatedAt = new Date(booking.createdAt);

			// Check if booking overlaps today using isBefore from date-fns
			const overlapsToday = (isBefore(bookingStartDate, today) && isBefore(today, bookingEndDate)) || isBefore(bookingCreatedAt, today);

			// If overlaps today and newer than current latest, update latest
			return overlapsToday && (!latest || isBefore(latest.createdAt, booking.createdAt)) ? booking : latest;
		});

	const isOccupied = latestbooking && withinBookingTime(latestbooking);

	function withinBookingTime(booking: CLASSROOMBOOKING) {
		const bookingStartTime = Number(booking.startTime.split(':')[0]);
		const bookingEndTime = Number(booking.endTime.split(':')[0]);

		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		return currentHour >= bookingStartTime && currentHour < bookingEndTime;
	}

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
						<div className='w-[95%] md:w-[82%] flex flex-col gap-4 bg-gray-200 p-3 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Classroom Details</h3>
							<ul className='text-sm grid grid-cols-2 gap-2 pl-4'>
								<li className='font-medium'>Location</li>
								<li className='font-light tracking-wide'>{classroom.location}</li>
								<li className='font-medium'>Classroom Location</li>
								<li className='font-light tracking-wide'>{classroom.name}</li>
								<li className='font-medium'>Classroom Status</li>
								<li className='font-light tracking-wide'>{isOccupied ? 'Occupied' : 'Available'}</li>
								<li className='font-medium'>Digital Tag</li>
								<li className='font-light tracking-wide'>{classroom.tag}</li>
							</ul>
							<BookingClient
								_id={classroom._id.toString()}
								isOccupied={isOccupied ? 'Occupied' : 'Available'}
								name={classroom.name}
							/>
						</div>
					</section>
					<section className='size-full flex flex-col items-center'>
						<h3 className='text-center text-xl font-medium tracking-wide'>Classroom Usage</h3>
						<div className='w-[95%] h-64 md:w-[45%] md:h-[350px] font-semibold flex items-center justify-center'>
							<Suspense fallback={<Spinner />}>
								<ClassroomUsageChart
									data={data}
									labels={classroomLabels}
									classnames='size-full'
								/>
							</Suspense>
						</div>
					</section>

					{/* Modal */}
				</section>
			</section>
		</AppLayout>
	);
}
