import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FaX } from 'react-icons/fa6';

interface AsideDrawerProps {
	children: React.ReactNode;
	title: string;
	description?: string;
	triggerButton: React.ReactNode;
	h?: string;
}

export function AsideDrawer({ children, description, title, triggerButton, h }: AsideDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
			<DrawerContent className={`${h ? h : 'md:h-[95vh] h-[98vh]'} w-full flex flex-col items-center overflow-hidden`}>
				<DrawerHeader className='relative w-[85%] mx-auto flex flex-col justify-center items-center'>
					<DrawerTitle className='tracking-wide'>{title}</DrawerTitle>
					{description && <DrawerDescription className='text-lg tracking-wide'>{description}</DrawerDescription>}
					<DrawerClose
						asChild
						className='absolute top-3 left-0 hidden md:flex items-center justify-center'>
						<button
							type='button'
							className='md:size-8 size-7 border border-red-500 text-red-500 bg-red-200 hover:bg-red-500 hover:text-white rounded-lg md:rounded-xl font-medium tracking-wider transition-all duration-300 ease-in-out text-base md:text-lg flex items-center justify-center'>
							<FaX />
						</button>
					</DrawerClose>
				</DrawerHeader>
				{children}
			</DrawerContent>
		</Drawer>
	);
}
