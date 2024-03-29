// import { NavButton } from '../button';
import ClientSideBar from './ClientsideBar';

export function SideBar() {
	return (
		<aside className='w-2/12 h-full bg-gray-200'>
			<section
				id='top'
				className='md:h-1/6 h-[13%]'></section>
			<ClientSideBar />
		</aside>
	);
}
