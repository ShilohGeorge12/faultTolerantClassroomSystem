import { getSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';

import { AppLayout } from '@/components/UIComponents/appLayout';
import { MenuClient } from '@/components/UIComponents/menuClient';
import { DeleteAccount } from '@/components/UIComponents/DeleteAccount';
import { EditProfile } from '@/components/UIComponents/editProfile';
import { Card } from '@/components/UIComponents/card';

import { AddUser } from './addUser';
import { AddClassroom } from './addClassroom';
import { UserProfileCard } from '@/components/UIComponents/card/userProfileCard';

export default async function Admin() {
	const session = await getSession();
	if (!session) redirect('/');

	return (
		<AppLayout>
			<section className='w-full h-full flex flex-col py-4 pb-8'>
				<MenuClient />
				<section className='w-[90%] mx-auto flex flex-col gap-10 items-center'>
					<div className='w-full flex items-center justify-center '>
						<div className='size-36 border-[10px] bg-gray-200 border-gray-400 rounded-full flex items-center justify-center text-7xl font-bold text-gray-500'>
							{session.user.username[0]}
						</div>
					</div>

					<section className='grid grid-cols-1 md:grid-cols-2 w-full gap-8 items-center justify-items-center'>
						<UserProfileCard
							username={session.user.username}
							department={session.user.department}
							role={session.user.role}>
							<EditProfile
								userId={session.user.userId}
								username={session.user.username}
								role={session.user.role}
							/>
						</UserProfileCard>

						<Card more='items-center'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Add User</h3>
							<AddUser session={session} />
						</Card>

						<Card more='items-center'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Delete Account</h3>
							<DeleteAccount session={session} />
						</Card>

						<Card more='items-center'>
							<h3 className='text-xl font-semibold text-center tracking-wide'>Add Classroom</h3>
							<AddClassroom session={session} />
						</Card>
					</section>
				</section>
			</section>
		</AppLayout>
	);
}
