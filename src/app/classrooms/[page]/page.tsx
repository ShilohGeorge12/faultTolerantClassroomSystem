import { MongoDB } from '@/db';
import { getSession } from '@/lib/sessions';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { HomeClientHeader } from '@/components/UIComponents/homeClient/clientheader';
import { HomePageClient } from '@/components/UIComponents/homeClient';
import { CLASSROOM } from '@/types';

export const generateStaticParams = async () => {
	return [{ page: '1' }, { page: '2' }];
};

export default async function Home({ params: { page } }: { params: { page: string } }) {
	const perPage = 8;
	const Page = parseInt(page) - 1;
	const sessions = await getSession();
	const classroomsPromise = MongoDB.getClassroom()
		.find()
		.sort('name -__v')
		.skip(Page * perPage)
		.limit(perPage)
		.select('-__v');

	const totalClassroomsPromise = MongoDB.getClassroom().find();

	const [classrooms, totalClassrooms] = await Promise.all([classroomsPromise, totalClassroomsPromise]);

	const data = JSON.parse(JSON.stringify(classrooms)) as unknown as CLASSROOM[];
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<HomeClientHeader username={sessions ? sessions.user.username : 'guest'} />
				<section className='w-full h-full px-2 md:px-4 pt-2 flex flex-col gap-y-3 overflow-hidden'>
					<HomePageClient
						page={Number(page)}
						classrooms={data}
						totalClassrooms={totalClassrooms.length}
						username={sessions ? sessions.user.username : 'guest'}
					/>
				</section>
			</section>
		</AppLayout>
	);
}
