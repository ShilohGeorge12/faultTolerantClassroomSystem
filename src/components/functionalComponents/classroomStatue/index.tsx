import { CLASSROOMBOOKING, CLASSROOM_DB } from '@/types';
import { Types, Document } from 'mongoose';
import { isBefore } from 'date-fns';

interface validateClassroomStatusProps {
	today: Date;
	classroom: Document<unknown, {}, CLASSROOM_DB> &
		CLASSROOM_DB & {
			_id: Types.ObjectId;
		};
}

export function validateClassroomStatus({ today, classroom }: validateClassroomStatusProps) {
	const latestbooking =
		classroom.bookings.length > 0 &&
		classroom.bookings.reduce((latest, booking) => {
			const bookingStartDate = new Date(booking.startDate);
			const bookingEndDate = new Date(booking.endDate);
			const bookingCreatedAt = new Date(booking.createdAt);
			console.log(bookingStartDate, bookingEndDate);

			// Check if booking overlaps today using isBefore from date-fns
			const overlapsToday = (isBefore(bookingStartDate, today) && isBefore(today, bookingEndDate)) || isBefore(bookingCreatedAt, today);

			// If overlaps today and newer than current latest, update latest
			return overlapsToday && (!latest || isBefore(latest.createdAt, booking.createdAt)) ? booking : latest;
		});

	function withinBookingTime(booking: CLASSROOMBOOKING) {
		const bookingStartTime = Number(booking.startTime.split(':')[0]);
		const bookingEndTime = Number(booking.endTime.split(':')[0]);

		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		return currentHour >= bookingStartTime && currentHour < bookingEndTime;
	}

	return latestbooking && withinBookingTime(latestbooking);
}
