import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { getSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';
import { EditProfile } from './editProfile';

export default async function Settings() {
	const session = await getSession();
	if (!session) redirect('/');

	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col py-4'>
				<MenuClient />
				<section className='w-[90%] mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 items-center '>
					<div className='w-full flex items-center justify-center md:col-span-2'>
						<div className='size-36 border-[10px] bg-gray-200 border-gray-400 rounded-full flex items-center justify-center text-7xl font-bold text-gray-500'>
							{session.user.username[0]}
						</div>
					</div>
					<div className='relative flex flex-col md:col-span-4 gap-6 bg-gray-200 py-6 px-4 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
						<h3 className='text-xl font-semibold text-center tracking-wide'>Classroom Details</h3>
						<ul className='text-base grid grid-cols-3 gap-3 pl-4'>
							<li className='font-medium'>Firstname: </li>
							<li className='font-light tracking-wide col-span-2'>{session.user.username}</li>
						</ul>
						<EditProfile username={session.user.username} />
					</div>
				</section>
			</section>
		</AppLayout>
	);
}
