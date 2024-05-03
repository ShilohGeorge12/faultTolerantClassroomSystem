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
