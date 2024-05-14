'use client';

import { SetStateAction } from 'react';
import { subDays, isBefore, addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
	date: DateRange | undefined;
	setDate: (val: SetStateAction<DateRange | undefined>) => void;
};

export function DatePickerWithRange({ className, date, setDate, id }: DatePickerWithRangeProps) {
	const getToday = () => new Date();
	return (
		<div
			id={id}
			className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn(
							'w-full h-full flex items-center justify-center bg-gray-100 text-gray-600 ring-1 ring-gray-400 hover:ring-2 focus:ring-2 font-normal',
							!date && 'text-muted-foreground'
						)}>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='start'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={1}
						disabled={(day) => isBefore(day, subDays(new Date(), 1))}
						fromDate={date?.from}
						toDate={addDays(new Date(), 0)}
						// toDate={addDays(new Date(), 1)}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
