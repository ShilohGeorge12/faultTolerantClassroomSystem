import { CLASSROOMBOOKING, isUserNoPassword } from '@/types';
import { Types } from 'mongoose';
import { GoClock } from 'react-icons/go';

export const List = ({ booking, showDate }: { booking: CLASSROOMBOOKING; showDate?: true }) => {
	const getUserDepartmentFromBooking = (userId: Types.ObjectId) => {
		const user = userId as any;
		return isUserNoPassword(user) && user.department;
	};
	const getUsernameFromBooking = (userId: Types.ObjectId) => {
		const user = userId as any;
		return isUserNoPassword(user) && user.username;
	};
	return (
		<li
			key={new Date(booking.createdAt).toString()}
			className={`grid ${
				showDate ? 'grid-cols-11' : 'grid-cols-9'
			} md:gap-4 gap-1 md:w-[90%] w-full justify-items-start transition-all duration-500 ease-in-out hover:scale-[1.01] md:hover:scale-105 border-b pb-2 border-gray-300`}>
			<span className='w-full col-span-1 flex justify-start md:justify-center items-start text-xl text-gray-500'>
				<GoClock />
			</span>
			{showDate && (
				<div className='w-full flex flex-col gap-2 items-start col-span-2'>
					<h3 className='font-medium tracking-wide md:text-base text-sm text-center w-full'>Date</h3>
					<p className='font-medium text-gray-400 flex items-center text-center justify-center w-full h-full'>{new Date(booking.date).toLocaleDateString()}</p>
				</div>
			)}
			<div className='w-full flex flex-col gap-2 items-start col-span-2'>
				<h3 className='font-medium tracking-wide md:text-base text-sm text-center text-wrap w-full'>Start time</h3>
				<p className='font-medium text-gray-400 flex items-center text-center justify-center w-full h-full'>
					{new Date(booking.startTime).toLocaleTimeString().split(':00')[0]}
				</p>
			</div>
			<div className='w-full flex flex-col gap-2 items-start col-span-2'>
				<h3 className='font-medium tracking-wide md:text-base text-sm text-center w-full text-wrap'>End time</h3>
				<p className='font-medium text-gray-400 flex items-center text-center justify-center w-full h-full'>
					{new Date(booking.endTime).toLocaleTimeString().split(':00')[0]}
				</p>
			</div>
			<div className='w-full flex flex-col gap-2 items-start col-span-2'>
				<h3 className='font-medium tracking-wide md:text-base text-sm text-center w-full text-wrap'>Booked by</h3>
				<p className='font-medium text-gray-400 flex items-center text-center justify-center w-full h-full'>{getUsernameFromBooking(booking.userId)}</p>
			</div>
			<div className='w-full flex flex-col gap-2 items-start col-span-2'>
				<h3 className='font-medium tracking-wide md:text-base text-sm text-center w-full text-wrap text-ellipsis overflow-x-clip'>Department</h3>
				<p className='font-medium text-gray-400 flex items-center text-center justify-center w-full h-full'>{getUserDepartmentFromBooking(booking.userId)}</p>
			</div>
		</li>
	);
};
