import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';

export default async function Settings() {
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<MenuClient />
				{/* <ClassroomUsageChart /> */}
			</section>
		</AppLayout>
	);
}
