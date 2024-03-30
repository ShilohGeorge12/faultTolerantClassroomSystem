import { AppLayout } from '@/components/appLayout';
import { MenuClient } from '@/components/menuClient';

export default function Home() {
	return (
		<AppLayout>
			<section className='w-full min-h-screen flex flex-col'>
				<MenuClient />
				<p className='flex w-full h-full text-center'>Home Page</p>
			</section>
		</AppLayout>
	);
}
