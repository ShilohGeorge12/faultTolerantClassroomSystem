import { getSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';

import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { DeleteAccount } from '@/components/UIComponents/DeleteAccount';
import { EditProfile } from '@/components/UIComponents/editProfile';

import { AddUser } from './addUser';
import { AddClassroom } from './addClassroom';

export default async function Admin() {
	const session = await getSession();
	if (!session) redirect('/');

	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col py-4'>
				<MenuClient />
				<section className='w-[90%] mx-auto flex flex-col gap-10 items-center '>
					<div className='w-full flex items-center justify-center '>
						<div className='size-36 border-[10px] bg-gray-200 border-gray-400 rounded-full flex items-center justify-center text-7xl font-bold text-gray-500'>
							{session.user.username[0]}
						</div>
					</div>

					<section className='grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center justify-items-center'>
						<div className='relative w-full flex flex-col gap-6 bg-gray-200 py-8 px-4 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Admin Profile</h3>
							<ul className='text-base grid grid-cols-3 gap-3 pl-4'>
								<li className='font-medium'>Username: </li>
								<li className='font-light tracking-wide col-span-2'>{session.user.username}</li>
								<li className='font-medium'>Role: </li>
								<li className='font-light tracking-wide col-span-2 capitalize'>{session.user.role}</li>
							</ul>
							<EditProfile username={session.user.username} />
						</div>

						<div className='relative w-full flex flex-col items-center justify-center gap-6 bg-gray-200 py-10 px-4 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Add User</h3>
							<AddUser session={session} />
						</div>
						<div className='relative w-full flex flex-col items-center justify-center gap-6 bg-gray-200 py-10 px-4 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Delete Account</h3>
							<DeleteAccount session={session} />
						</div>
						<div className='relative w-full flex flex-col items-center justify-center gap-6 bg-gray-200 py-10 px-4 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Add Classroom</h3>
							<AddClassroom session={session} />
						</div>
					</section>
				</section>
			</section>
		</AppLayout>
	);
}
