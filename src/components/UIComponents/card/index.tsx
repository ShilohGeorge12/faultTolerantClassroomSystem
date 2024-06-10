interface CardProps {
	children: Readonly<React.ReactNode>;
	more?: string;
}

export const Card = ({ children, more }: CardProps) => {
	return (
		<div
			className={`relative w-full h-[212px] flex flex-col gap-6 bg-gray-200 py-4 md:px-8 px-6 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear ${more}`}>
			{children}
		</div>
	);
};
