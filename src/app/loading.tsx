import { AppLayout } from '@/components/UIComponents/appLayout';
import { Spinner } from '@/components/UIComponents/loadingSpinner';
import { MenuClient } from '@/components/UIComponents/menuClient';

export default function Loading() {
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<MenuClient />
				<Spinner />
			</section>
		</AppLayout>
	);
}
