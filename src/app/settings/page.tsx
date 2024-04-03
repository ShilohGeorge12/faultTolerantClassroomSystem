import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';

export default function Settings() {
	return (
		<AppLayout>
			<section className='w-full min-h-screen flex flex-col'>
				<MenuClient />
				<p className='flex w-full h-full text-center'>Settings Page</p>
			</section>
		</AppLayout>
	);
}
