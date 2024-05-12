import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MongoDB } from '@/db';
import { getSession } from '@/lib/sessions';
import { GoClock } from 'react-icons/go';
import { CLASSROOM, isUserNoPassword } from '@/types';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { validateBookings } from '@/components/functionalComponents/validateBookings';
import { BookingClient } from './bookingclient';
import { ClassroomDetailsHeaderClient } from './headerclient';
import { EditClassroom } from './editClassroom';
import { DeleteClassroom } from './deleteClassroom';
import { Types } from 'mongoose';

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
	const getUserFromBookings = (userId: Types.ObjectId) => {
		const user = userId as any;
		return isUserNoPassword(user) && user.username;
	};

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
						<div className='w-[98%] md:w-[82%] flex flex-col gap-4 bg-gray-200 py-3 px-2 md:p-3 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-300 ease-linear relative'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Classroom Details</h3>
							<ul className='text-sm grid grid-cols-7 gap-3 pl-4'>
								<li className='font-medium col-span-3'>Classroom Venue</li>
								<li className='font-light tracking-wide col-span-4'>{classroom.location}</li>
								<li className='font-medium col-span-3'>Classroom Location</li>
								<li className='font-light tracking-wide col-span-4'>{classroom.name}</li>
								<li className='font-medium col-span-3'>Classroom Status</li>
								<li className='font-light tracking-wide col-span-4'>{isOccupied ? 'Occupied' : 'Available'}</li>
								<li className='font-medium col-span-3'>Digital Tag</li>
								<li className='font-light tracking-wide col-span-4'>{classroom.tag}</li>
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
							<DeleteClassroom
								session={session}
								_id={classroom._id.toString()}
								name={classroom.name}
							/>
						</div>
					</section>

					<section className='w-full h-fit min-h-[50vh]s flex md:flex-row justify-center flex-col gap-2'>
						<section className='w-full flex flex-col items-center gap-4'>
							<h3 className='text-center text-xl font-medium tracking-wide'>Booking History</h3>
							<ul className='w-full flex flex-col items-center gap-4'>
								{classroom.bookings.length > 0 &&
									classroom.bookings.map((booking) => (
										<li
											key={booking.createdAt.toString()}
											className='grid grid-cols-11 md:gap-4 gap-2 md:w-[90%] w-full justify-items-start transition-all duration-500 ease-in-out hover:scale-105 border-b pb-2 border-gray-300'>
											<span className='w-full ol-span-1 flex justify-start items-center text-xl text-gray-500'>
												<GoClock />
											</span>
											<div className='w-full flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm text-wrap'>Start date</h3>
												<p className='font-medium text-gray-400 text-wrap flex justify-center md:justify-start w-full h-full'>
													{new Date(booking.startDate).toLocaleDateString()}
												</p>
											</div>
											<div className='w-full flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm text-center text-wrap'>Start time</h3>
												<p className='font-medium text-gray-400 flex items-center text-center justify-center md:justify-start w-full h-full'>{booking.startTime}</p>
											</div>
											<div className='w-full flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm text-center text-wrap'>End date</h3>
												<p className='font-medium text-gray-400 flex items-center text-center justify-center md:justify-start w-full h-full'>
													{new Date(booking.endDate).toLocaleDateString()}
												</p>
											</div>
											<div className='w-full flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm text-center text-wrap'>End time</h3>
												<p className='font-medium text-gray-400 flex items-center text-center justify-center md:justify-start w-full h-full'>{booking.endTime}</p>
											</div>
											<div className='w-full flex flex-col gap-2 items-start col-span-2'>
												<h3 className='font-medium tracking-wide md:text-base text-sm text-center text-wrap'>Booked by</h3>
												<p className='font-medium text-gray-400 flex items-center text-center justify-center md:justify-start w-full h-full'>
													{getUserFromBookings(booking.userId)}
												</p>
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

// fixed booking duplication
