import type { Metadata } from 'next';
import { NotFoundClient } from '@/components/UIComponents/notFoundClient';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';

export const metadata: Metadata = {
	title: `404 - Page Not Found`,
	description: `404 Error - The Page you are looking for was Not Found.`,
};

export default function NotFound() {
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<MenuClient />
				<NotFoundClient />
			</section>
		</AppLayout>
	);
}
