import { AppLayout } from '@/components/UIComponents/appLayout';
import { FindClassroomsClient } from './FindClassroomsclient';
import { FindClassroomHeaderClient } from './headerClient';
import { getSession } from '@/lib/sessions';

export default async function FindClassrooms() {
	const sessions = await getSession();
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col items-center md:gap-4 gap-4 md:px-4 px-1 py-2'>
				<FindClassroomHeaderClient />
				<FindClassroomsClient session={sessions} />
			</section>
		</AppLayout>
	);
}
