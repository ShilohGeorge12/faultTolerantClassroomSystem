import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
// import { MongoDB } from '@/db';
// import { Controls } from './controls';

// interface SettingsProps {
// 	page: string | undefined;
// 	perpage: string | undefined;
// }

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default async function Settings() {
	// const page = searchParams['page'] ?? '1';
	// const perPage = searchParams['perpage'] ?? '5';
	// const classrooms = await MongoDB.getClassroom()
	// 	.find()
	// 	.sort('name -__v')
	// 	.skip(parseInt(page) * parseInt(perPage))
	// 	.limit(parseInt(perPage))
	// 	.select('-__v');

	// const startIndex = Number(page) * 5;
	// const endIndex = startIndex + 5;
	// const paginatedData = classrooms.slice(startIndex, endIndex);

	return (
		<AppLayout>
			<section className='w-full min-h-screen flex flex-col'>
				<MenuClient />
				{/* <p className='flex w-full h-full text-center'>Settings Page</p> */}
				{/* <ul className='w-full h-full flex flex-col gap-4 items-center justify-center'>
					{classrooms.map((classroom) => (
						<li
							key={classroom._id.toString()}
							className='bg-gray-300 p-2 rounded-lg'>
							{classroom.name}
						</li>
					))}
					<Controls /> 
				 </ul> */}
			</section>
		</AppLayout>
	);
}

// const getClassrooms = async (searchParams: SettingsProps) => {
// 	const page = searchParams['page'] ?? '1';
// 	const perPage = searchParams['perpage'] ?? '8';
// 	const classrooms = await MongoDB.getClassroom()
// 		.find()
// 		.sort('name -__v')
// 		.skip(parseInt(page) * parseInt(perPage))
// 		.limit(parseInt(perPage))
// 		.select('-__v');
// 	return classrooms;
// };
