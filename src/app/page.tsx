import { AppLayout } from '@/components/UIComponents/appLayout';
import { HomePageClient } from '@/components/UIComponents/homeClient';
import { HomeClientHeader } from '@/components/UIComponents/homeClient/clientheader';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { Suspense } from 'react';

export default function Home() {
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<MenuClient />
				<Suspense fallback={<>Loading....</>}>
					<HomeClientHeader />
					<hr className='w-[95%] border-[1.5px] mt-1 rounded mx-auto' />
					<HomePageClient />
				</Suspense>
				{/* implement pagination */}
			</section>
		</AppLayout>
	);
}
