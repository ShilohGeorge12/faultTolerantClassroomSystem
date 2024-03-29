import type { Metadata } from 'next';
import { NotFoundClient } from '@/components/notFoundClient';
import { AppLayout } from '@/components/appLayout';

export const metadata: Metadata = {
	title: `404 | Not Found`,
	description: `404 Error | The Page you are looking for was Not Found.`,
};

export default function NotFound() {
	return (
		<AppLayout>
			<NotFoundClient />
		</AppLayout>
	);
}
