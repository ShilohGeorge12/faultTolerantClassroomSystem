import { MongoDB } from '@/db';
import { getSession } from '@/lib/sessions';
import { AppLayout } from '@/components/UIComponents/appLayout';
import { HomeClientHeader } from '@/components/UIComponents/homeClient/clientheader';
import { CLASSROOM } from '@/types';
import { PaginationControls } from '@/components/functionalComponents/paginationControls';
import { Classrooms } from '@/components/UIComponents/classrooms';
import { formatCurrentTime } from '@/components/functionalComponents/formatCurrentTime';

export const generateStaticParams = async () => {
	return [{ page: '1' }];
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
	const time = formatCurrentTime();
	const meridiem = time.split(' ');
	const H3Classes = `font-bold text-xl capitalize text-black`;

	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<HomeClientHeader username={sessions ? sessions.user.username : 'guest'} />
				<section className='w-full h-full px-2 md:px-4 pt-2 flex flex-col gap-y-3 overflow-hidden'>
					{meridiem.includes('AM') && <h3 className={H3Classes}>Good Morning, {sessions ? sessions.user.username : 'guest'}</h3>}
					{meridiem.includes('PM') && <h3 className={H3Classes}>Good Day, {sessions ? sessions.user.username : 'guest'}</h3>}
					<Classrooms classrooms={data} />
					<PaginationControls totalClassrooms={totalClassrooms.length} />
				</section>
			</section>
		</AppLayout>
	);
}
