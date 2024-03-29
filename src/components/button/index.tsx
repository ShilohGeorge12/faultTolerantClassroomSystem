'use client';

interface buttonProps {
	onClick?: () => void; //e: MouseEvent<HTMLButtonElement>) => void;
	name: string;
	value: JSX.Element; //IconType | string;
	size: 'lg' | 'md' | 'sm';
	more: string;
}

export function NavButton({ value, name, more, onClick }: Omit<buttonProps, 'size'>) {
	return (
		<button
			type='button'
			name={name}
			className={`flex transition duration-500 ease-in-out hover:scale-105 p-2 rounded-xl gap-x-2 justify-center items-center text-sm ${more}`}
			onClick={onClick}>
			{value}
			{/* <FaLaptop className='text-lg' />
      <span className='text-sm'>Classrooms</span> */}
		</button>
	);
}
