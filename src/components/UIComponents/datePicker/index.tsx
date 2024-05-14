'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { subDays, isBefore, isAfter, addDays, format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SetStateAction } from 'react';

type DatePickerProps = React.HTMLAttributes<HTMLDivElement> & {
	date: Date | undefined;
	setDate: (val: SetStateAction<Date | undefined>) => void;
};

export function DatePicker({ date, setDate }: DatePickerProps) {
	return (
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
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'>
				<Calendar
					initialFocus
					mode='single'
					selected={date}
					onSelect={setDate}
					disabled={(day) => isBefore(day, subDays(new Date(), 2))}
					defaultMonth={date}
					fromDate={date}
					toDate={addDays(new Date(), 1)}
				/>
			</PopoverContent>
		</Popover>
	);
}
