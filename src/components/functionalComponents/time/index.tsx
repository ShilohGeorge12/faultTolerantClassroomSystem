export function getTimeIn24Hours(time: Date) {
	const hours = time.getHours().toString().padStart(2, '0');
	const minutes = time.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
}

export function isWithinTime(startTime: string, endTime: string, today: Date) {
	const currentTime = getTimeIn24Hours(today);
	const currentHour = parseInt(currentTime.split(':')[0]);

	const bookingStartHour = parseInt(startTime.split(':')[0]);
	const bookingEndHour = parseInt(endTime.split(':')[0]);

	return currentHour >= bookingStartHour && currentHour < bookingEndHour;
}

export function convertTimeStringToDateObject(timeString: string) {
	// Split the time string into hours, minutes, and meridian indicator (optional)
	const hours = timeString.split(':')[0];
	const minutes = timeString.split(':')[1].split(' ')[0];
	const meridian = timeString.split(' ')[1].trim();

	// Handle 12-hour format (adjust based on your time zone if needed)
	let adjustedHours = parseInt(hours);
	if (meridian && meridian.toUpperCase() === 'PM' && adjustedHours !== 12) {
		adjustedHours += 12;
	} else if (meridian && meridian.toUpperCase() === 'AM' && adjustedHours === 12) {
		adjustedHours = 0;
	}

	// Create a Date object with the extracted values
	const dateObject = new Date();

	dateObject.setHours(adjustedHours, Number(minutes), 0, 0); // Set hours, minutes, seconds, milliseconds

	return dateObject;
}
