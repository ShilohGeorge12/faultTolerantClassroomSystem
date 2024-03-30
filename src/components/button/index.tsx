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
			className={`flex transition duration-500 ease-in-out hover:scale-105 p-2 rounded-lg gap-x-2 justify-center items-center text-sm ${more}`}
			onClick={onClick}>
			{value}
		</button>
	);
}

export function AuthButton({ value, name, onClick }: Omit<buttonProps, 'size' | 'more'>) {
	return (
		<button
			type='button'
			name={name}
			className={`flex transition duration-500 ease-in-out hover:scale-105 p-2 rounded-lg gap-x-2 justify-center items-center text-sm bg-black hover:bg-red-500 text-white`}
			onClick={onClick}>
			{value}
		</button>
	);
}

export function MenuButton({}) {
	return (
		<button
			type='button'
			name={``}
			className={``}
			// onClick={() => null}
		>
			menu
		</button>
	);
}