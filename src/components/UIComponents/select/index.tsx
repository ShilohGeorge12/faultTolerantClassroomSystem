'use client';
import { useState } from 'react';

interface SelectOption<T> {
	value: T;
	label: string;
}

interface CustomSelectProps<T> {
	options: SelectOption<T>[];
	value: T;
	onChange: (value: T) => void;
}

export function Select<T>({ options, value, onChange }: CustomSelectProps<T>) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => setIsOpen(!isOpen);

	const handleOptionClick = (option: T) => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div className='relative size-full flex items-center justify-center uppercase tracking-wide z-30'>
			<div
				className={`w-full h-full flex items-center justify-center cursor-pointer focus:outline-none hover:ring-2 ring-gray-400 outline-0 rounded-lg bg-gray-100 transition-all duration-300 ease-in-out text-base font-semibold tracking-widest ${
					isOpen ? 'shadow-lg shadow-gray-400 ring-2' : 'ring-1'
				}`}
				onClick={handleClick}>
				<span>{options.find((opt) => opt.value === value)?.label}</span>
			</div>
			{isOpen && (
				<div className={`absolute bg-white -bottom-0 -left-0 w-[250px] md:w-[300px] h-fit pb-1 rounded-lg shadow-lg overflow-y-scroll z-50`}>
					<ul className='bg-white rounded-lg shadow-sm py-1'>
						{options.map((option) => (
							<li
								key={`${option.value}`}
								className='text-sm cursor-pointer hover:bg-gray-100 px-3 py-2 w-full flex items-center justify-center'
								onClick={() => handleOptionClick(option.value)}>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
