'use client';
import { useGlobals } from '@/context';
import ClientSideBar from './ClientsideBar';

export function SideBar() {
	const {
		state: { menu },
	} = useGlobals();
	return (
		<aside className={`w-2/12 ${menu === 'open' ? '' : 'hidden'} md:block h-full bg-gray-200`}>
			<section
				id='top'
				className='md:h-1/6 h-[13%]'
			/>
			<ClientSideBar />
		</aside>
	);
}
