'use client';

import { TuiDateTimePicker } from 'nextjs-tui-date-picker';

interface InputProps {
	date: Date;
	onChange: (date: string) => void;
}

export function Input({ onChange, date }: InputProps) {
	return (
		<>
			<TuiDateTimePicker
				handleChange={onChange}
				date={date}
				format='YYYY-MM-dd hh:mm'
				inputWidth={170}
				containerWidth={200}
				fontSize={14}
				timePicker
			/>
		</>
	);
}
