'use client';

import Link from 'next/link';

interface buttonProps {
	onClick?: () => void; //e: MouseEvent<HTMLButtonElement>) => void;
	name: string;
	value: JSX.Element; //IconType | string;
	size: 'lg' | 'md' | 'sm';
	more: string;
}

type AuthButtonProps = Omit<buttonProps, 'size' | 'more'> & ({ href: string; islogin: true } | { islogin?: undefined });
type NavButtonProps = Omit<buttonProps, 'size' | 'onClick'> & { href: string; onClick?: buttonProps['onClick'] };

export function NavButton({ value, name, more, href, onClick }: NavButtonProps) {
	return (
		<Link
			title={name}
			href={href}>
			<span
				className={`flex transition duration-500 ease-in-out hover:scale-105 md:w-[148px] h-[36px] px-2 rounded-lg gap-x-2 items-center text-sm ${more}`}
				onClick={onClick}>
				{value}
			</span>
		</Link>
	);
}

export function AuthButton(props: AuthButtonProps) {
	const { value, name, islogin, onClick } = props;
	return (
		<>
			{islogin && (
				<Link
					title={name}
					href={props.href}>
					<span
						className={`flex transition duration-500 ease-in-out hover:scale-105 md:w-[148px] h-[36px] px-2 rounded-lg gap-x-2 items-center text-sm hover:bg-blue-500		bg-black text-white`}
						onClick={onClick}>
						{value}
					</span>
				</Link>
			)}

			{!islogin && (
				<button
					type='button'
					name={name}
					className={`flex transition duration-500 ease-in-out hover:scale-105 p-2 rounded-lg gap-x-2 justify-center items-center text-sm bg-black hover:bg-red-500 text-white`}
					onClick={onClick}>
					{value}
				</button>
			)}
		</>
	);
}

export function MenuButton({ name }: { name: string }) {
	return (
		<button
			type='button'
			name={name}
			className={`rounded-xl p-2 bg-blue-400 text-white`}>
			{name}
		</button>
	);
}

export function FilterButton({ value, more, page }: { value: string; page: number } & Omit<buttonProps, 'value' | 'size' | 'onClick' | 'name'>) {
	return (
		<Link
			title={`filter classrooms button by ${value}`}
			href={`/classrooms/${page}?q=${value}`}
			className={`transition duration-500 ease-in-out hover:scale-105 py-1 px-3 rounded-2xl text-xs ${more} text-white`}>
			{value}
		</Link>
	);
}
