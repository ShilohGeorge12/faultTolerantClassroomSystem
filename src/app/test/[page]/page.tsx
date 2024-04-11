import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { MongoDB } from '@/db';
// import { Controls } from '../../../components/functionalComponents/paginationControls';

export default async function Page({ params: { page } }: { params: { page: string } }) {
	const perPage = 8;
	const Page = parseInt(page) - 1;
	const classrooms = await MongoDB.getClassroom()
		.find()
		.sort('name -__v')
		.skip(Page * perPage)
		.limit(perPage)
		.select('-__v');

	const totalClassrooms = (await MongoDB.getClassroom().find()).length;

	return (
		<AppLayout>
			<section className='w-full min-h-screen flex flex-col'>
				<MenuClient />
				<strong className='text-center text-xl'>{Math.random().toFixed(2)}</strong>
				<ul className='w-full h-full flex flex-col gap-4 items-center justify-center'>
					{classrooms.map((classroom) => (
						<li
							key={classroom._id.toString()}
							className='bg-gray-300 p-2 rounded-lg'>
							{classroom.name}
						</li>
					))}
					{/* <Controls totalClassrooms={totalClassrooms} /> */}
				</ul>
			</section>
		</AppLayout>
	);
}
