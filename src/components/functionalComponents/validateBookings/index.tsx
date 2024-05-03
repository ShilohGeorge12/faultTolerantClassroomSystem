import { CLASSROOMBOOKING } from '@/types';
import { isWithinTime } from '../time';

export function validateBookings(bookings: CLASSROOMBOOKING[], today: Date) {
	return (
		bookings.length > 0 &&
		bookings.some((booking) => {
			const bookingStartDate = new Date(booking.startDate);
			const bookingEndDate = new Date(booking.endDate);
			const bookingStartTime = booking.startTime;
			const bookingEndTime = booking.endTime;

			const result = isWithinTime(bookingStartTime, bookingEndTime, today);

			return bookingStartDate === today && bookingEndDate === today && result;
		})
	);
}
