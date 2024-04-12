import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';

export default async function Settings() {
	return (
		<AppLayout>
			<section className='w-full min-h-screen flex flex-col'>
				<MenuClient />
			</section>
		</AppLayout>
	);
}
