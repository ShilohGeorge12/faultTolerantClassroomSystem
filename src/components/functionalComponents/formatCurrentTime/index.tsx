export function formatCurrentTime(): string {
	const options: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	const formatter = new Intl.DateTimeFormat('en-US', options);
	const formattedTime = formatter.format(new Date());
	return formattedTime;
}
