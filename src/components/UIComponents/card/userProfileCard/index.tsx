import { Card } from '..';

interface userProfileCardProps {
	children: Readonly<React.ReactNode>;
	username: string;
	department: string;
	role: string;
}

export const UserProfileCard = ({ children, username, department, role }: userProfileCardProps) => {
	return (
		<Card>
			<h3 className='text-xl font-semibold text-center tracking-wide'>Admin Profile</h3>
			<ul className='text-base grid grid-cols-4 gap-3 tracking-wider'>
				<li className='col-span-2 font-semibold'>Username: </li>
				<li className='font-light col-start-3 col-end-5'>{username}</li>
				<li className='col-span-2 font-semibold'>Department: </li>
				<li className='font-light col-start-3 col-end-5'>{department}</li>
				<li className='col-span-2 font-semibold'>Role: </li>
				<li className='font-light col-start-3 col-end-5 uppercase'>{role}</li>
			</ul>
			{children}
		</Card>
	);
};
