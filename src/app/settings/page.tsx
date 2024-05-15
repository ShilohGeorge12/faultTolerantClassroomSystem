import { redirect } from 'next/navigation';
import { getSession } from '@/lib/sessions';

import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { DeleteAccount } from '@/components/UIComponents/DeleteAccount';
import { EditProfile } from '@/components/UIComponents/editProfile';
import { Card } from '@/components/UIComponents/card';

export default async function Settings() {
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
						<Card>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Admin Profile</h3>
							<ul className='text-base grid grid-cols-4 gap-3 tracking-wider'>
								<li className='col-span-2 font-semibold'>Username: </li>
								<li className='font-light col-start-3 col-end-5'>{session.user.username}</li>
								<li className='col-span-2 font-semibold'>Department: </li>
								<li className='font-light col-start-3 col-end-5'>{session.user.department}</li>
								<li className='col-span-2 font-semibold'>Role: </li>
								<li className='font-light col-start-3 col-end-5 capitalize'>{session.user.role}</li>
							</ul>
							<EditProfile username={session.user.username} />
						</Card>

						<Card more='items-center'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Delete Account</h3>
							<DeleteAccount session={session && session} />
						</Card>
						{/* <div className='relative w-full flex flex-col items-center justify-center gap-6 bg-gray-200 py-10 px-4 rounded-2xl hover:shadow-lg hover:shadow-gray-200 hover:scale-105 transition duration-500 ease-linear'>
						</div> */}
					</section>
				</section>
			</section>
		</AppLayout>
	);
}
