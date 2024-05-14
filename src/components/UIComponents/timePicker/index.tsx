'use client';

import { useEffect, useState } from 'react';

interface TimeInputProps {
	value: string;
	setTimeChange: (time: string) => void;
}

export function TimeInput({ setTimeChange, value }: TimeInputProps) {
	const initState = {
		hour: value.split(':')[0],
		minute: value.split('_')[0].split(':')[1],
		merdian: value.split('_')[1],
	};
	const [time, setTime] = useState<{ hour: string; minute: string; merdian: string }>(initState);
	const hourOptions: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
	const minuteOptions: number[] = Array.from({ length: 60 }, (_, i) => i);
	const merdian = ['AM', 'PM'];

	useEffect(() => {
		setTimeChange(`${time.hour}:${time.minute}_${time.merdian}`);
	}, []);

	useEffect(() => {
		setTimeChange(`${time.hour}:${time.minute}_${time.merdian}`);
	}, [time]);

	return (
		<>
			<CustomTimeSelect
				options={hourOptions}
				value={time.hour}
				onChange={(e) => setTime((prev) => ({ ...prev, hour: typeof e === 'number' ? e.toString().padStart(2, '0') : e }))}
			/>
			<CustomTimeSelect
				options={minuteOptions}
				value={time.minute}
				onChange={(e) => setTime((prev) => ({ ...prev, minute: typeof e === 'number' ? e.toString().padStart(2, '0') : e }))}
			/>
			<CustomTimeSelect
				options={merdian}
				value={time.merdian}
				onChange={(e) => setTime((prev) => ({ ...prev, merdian: typeof e === 'number' ? e.toString().padStart(2, '0') : e }))}
			/>
		</>
	);
}

interface CustomSelectProps {
	options: (string | number)[];
	value: string | number;
	onChange: (value: string | number) => void;
}

const CustomTimeSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const val = typeof value === 'number' ? value.toString().padStart(2, '0') : value;

	const isStringArr = (arg: (string | number)[]): arg is string[] => {
		return typeof (arg as string[])[0] === 'string';
	};

	const handleClick = () => setIsOpen(!isOpen);

	const handleOptionClick = (option: typeof value) => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div className='relative size-full flex items-center justify-center'>
			<div
				className={`w-full h-full flex items-center justify-center cursor-pointer focus:outline-none hover:ring-2 ring-gray-400 outline-0 rounded-lg bg-gray-100 transition-all duration-300 ease-in-out text-base font-semibold ${
					isOpen ? 'shadow-lg shadow-gray-400 ring-2' : 'ring-1'
				}`}
				onClick={handleClick}>
				<span>{val}</span>
			</div>
			{isOpen && (
				<div className={`absolute -bottom-10 -left-14 w-[80px] h-[250px]s rounded-md shadow-lg overflow-y-scroll ${isStringArr(options) ? 'h-[90px]' : 'h-[250px]'}`}>
					<ul className='bg-white rounded-md shadow-sm py-1'>
						{options.map((option) => (
							<li
								key={option}
								className='text-sm cursor-pointer hover:bg-gray-100 px-3 py-2 w-full flex items-center justify-center'
								onClick={() => handleOptionClick(option)}>
								{option.toString().padStart(2, '0')}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
