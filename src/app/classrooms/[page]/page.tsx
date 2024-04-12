import { AppLayout } from '@/components/UIComponents/appLayout';
import { HomePageClient } from '@/components/UIComponents/homeClient';
import { HomeClientHeader } from '@/components/UIComponents/homeClient/clientheader';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { MongoDB } from '@/db';
import { CLASSROOM } from '@/types';
import { Suspense } from 'react';

export const generateStaticParams = async () => {
	return [{ page: '1' }, { page: '2' }];
};

export default async function Home({ params: { page } }: { params: { page: string } }) {
	const perPage = 8;
	const Page = parseInt(page) - 1;
	console.log('page=', Page);
	const classrooms = await MongoDB.getClassroom()
		.find()
		.sort('name -__v')
		.skip(Page * perPage)
		.limit(perPage)
		.select('-__v');

	const totalClassrooms = (await MongoDB.getClassroom().find()).length;
	const data = JSON.parse(JSON.stringify(classrooms)) as unknown as CLASSROOM[];
	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col'>
				<MenuClient />
				<Suspense fallback={<>Loading....</>}>
					<HomeClientHeader />
					<section className='w-full h-full px-2 md:px-4 pt-2 flex flex-col gap-y-3 overflow-hidden'>
						<HomePageClient
							page={Number(page)}
							classrooms={data}
							totalClassrooms={totalClassrooms}
						/>
					</section>
				</Suspense>
			</section>
		</AppLayout>
	);
}
