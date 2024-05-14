import { CLASSROOMBOOKING } from '@/types';

export function validateBookings(bookings: CLASSROOMBOOKING[], today: Date) {
	const now = new Date(); // Current date and time

	return bookings.some((booking) => {
		const bookingDate = new Date(booking.date);
		const startTime = new Date(booking.startTime);
		const endTime = new Date(booking.endTime);

		// Set both dates to midnight to compare only the dates, ignoring the time
		const todayMidnight = new Date(today);
		todayMidnight.setHours(0, 0, 0, 0);
		bookingDate.setHours(0, 0, 0, 0);

		// Check if the booking is for today
		if (bookingDate.getTime() !== todayMidnight.getTime()) {
			return false; // Skip if the booking is not for today
		}

		// Check if the current time falls within the booking's time frame
		const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
		const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();
		const nowMinutes = now.getHours() * 60 + now.getMinutes();

		return isWithinTime(nowMinutes, startTimeMinutes, endTimeMinutes);
	});
}

// Helper function to check if a given time is within a time frame
function isWithinTime(time: number, startTime: number, endTime: number) {
	return time >= startTime && time <= endTime;
}

export function onGoingBooking(bookings: CLASSROOMBOOKING[], today: Date): CLASSROOMBOOKING[] {
	const now = new Date(); // Current date and time

	return bookings.filter((booking) => {
		const bookingDate = new Date(booking.date);
		const startTime = new Date(booking.startTime);
		const endTime = new Date(booking.endTime);

		// Set both dates to midnight to compare only the dates, ignoring the time
		const todayMidnight = new Date(today);
		todayMidnight.setHours(0, 0, 0, 0);
		bookingDate.setHours(0, 0, 0, 0);

		// Check if the booking is for today
		if (bookingDate.getTime() !== todayMidnight.getTime()) {
			return false; // Skip if the booking is not for today
		}

		// Check if the current time falls within the booking's time frame
		const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
		const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();
		const nowMinutes = now.getHours() * 60 + now.getMinutes();

		return isWithinTime(nowMinutes, startTimeMinutes, endTimeMinutes);
	});
}
