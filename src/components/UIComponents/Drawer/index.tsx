import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FaX } from 'react-icons/fa6';

interface AsideDrawerProps {
	children: React.ReactNode;
	title: string;
	description?: string;
}

export function AsideDrawer({ children, description, title }: AsideDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button
					type='button'
					name='search classrooms'
					className='w-3/4 md:w-1/3 h-7 text-gray-500 placeholder-gray-500 tracking-wider placeholder:tracking-wider font-medium text-base md:text-lg outline-0 ring-2 bg-gray-100 ring-gray-200 hover:ring-4 rounded-xl'
					// placeholder='Enter Classroom Tag...'
				>
					Search for a Classroom...
				</button>
			</DrawerTrigger>
			<DrawerContent className='md:h-[95vh] h-[98vh] w-full flex flex-col items-center overflow-hidden'>
				{/* <section className=''> */}
				<DrawerHeader className='relative w-[85%] mx-auto flex justify-center items-center'>
					<DrawerTitle className='tracking-wide'>{title}</DrawerTitle>
					{description && <DrawerDescription>{description}</DrawerDescription>}
					<DrawerClose
						asChild
						className='absolute top-3 left-0'>
						<button
							type='button'
							className='md:size-8 size-7 bg-gray-200 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-lg md:rounded-xl font-medium tracking-wider transition-all duration-300 ease-in-out text-base md:text-lg flex items-center justify-center'>
							<FaX />
						</button>
					</DrawerClose>
				</DrawerHeader>
				{children}
				{/* </section> */}
			</DrawerContent>
		</Drawer>
	);
}
