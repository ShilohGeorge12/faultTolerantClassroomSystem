export function validateDate(date: string): boolean {
	const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
	if (!dateRegex.test(date)) return false;
	const [day, month, year] = date.split('/').map(Number);
	const currentDate = new Date(year, month - 1, day);

	return currentDate.getDate() === day && currentDate.getMonth() === month - 1 && currentDate.getFullYear() === year;
}

export function validateTime(time: string): boolean {
	const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
	return timeRegex.test(time);
}
