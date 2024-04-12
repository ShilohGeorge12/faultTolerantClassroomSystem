'use client';
import { useGlobals } from '@/context';
import ClientSideBar from './ClientsideBar';

export function SideBar() {
	const {
		state: { menu },
	} = useGlobals();
	return (
		<aside className={`w-2/12 ${menu === 'open' ? 'absolute top-0 left-0 z-30' : 'hidden'} md:block h-full bg-gray-200`}>
			<section
				id='top'
				className='md:h-[11%] h-[11%]'
			/>
			<ClientSideBar />
		</aside>
	);
}
