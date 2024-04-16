import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { MongoDB } from '@/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BookingClient } from './bookingclient';

export default async function Home({ params: { _id } }: { params: { _id: string } }) {
	const classroom = await MongoDB.getClassroom().findOne({ _id });
	if (!classroom) notFound();

	return (
		<AppLayout>
			<section className='w-full h-full'>
				<MenuClient />
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
						<div className='flex flex-col gap-4 bg-gray-200 p-3 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Classroom Details</h3>
							<ul className='text-sm grid grid-cols-2 gap-2 pl-4'>
								<li className='font-medium'>Location</li>
								<li className='font-light tracking-wide'>{classroom.location}</li>
								<li className='font-medium'>Classroom Location</li>
								<li className='font-light tracking-wide'>{classroom.name}</li>
								<li className='font-medium'>Classroom Status</li>
								<li className='font-light tracking-wide'>{classroom.status === 'FREE' ? 'Available' : 'Occupied'}</li>
								<li className='font-medium'>Digital Tag</li>
								<li className='font-light tracking-wide'>{classroom.tag}</li>
							</ul>
							<BookingClient
								status={classroom.status}
								name={classroom.name}
							/>
						</div>
					</section>
					<section className='text-center text-xl font-medium tracking-wide'>Classroom Usage</section>

					{/* Modal */}
				</section>
			</section>
		</AppLayout>
	);
}
