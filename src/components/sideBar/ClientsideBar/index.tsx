'use client';

import { FaLaptop } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { NavButton } from '@/components/button';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { UrlPath } from '@/types';

export default function ClientSideBar() {
	const pathname = usePathname();
	const { push } = useRouter();

	const isPath = (path: UrlPath, subPaths?: string) => {
		if (pathname === path) {
			//|| pathname.includes(subPaths)) {
			return 'bg-blue-400 text-white';
		}
		return '';
	};

	const ClassroomClickFn = async () => {
		push('/');
	};

	const FindClassroomClickFn = async () => {
		push('/find-classroom');
	};

	return (
		<nav
			id='navbuttons'
			className='border w-full pl-3 md:pl-6 pt-2 h-5/6 border-blue-500 flex items-start flex-col gap-4 font-bold'>
			<NavButton
				name={`Classrooms`}
				more={`${isPath('/')}`}
				value={
					<>
						<FaLaptop className='text-lg' />
						<span className='hidden md:flex'>Classrooms</span>
					</>
				}
				onClick={ClassroomClickFn}
			/>
			<NavButton
				name={`Find Classroom`}
				more={`${isPath('/find-classroom')}`}
				value={
					<>
						<FaSearch />
						<span className='hidden md:flex'>Find Classroom</span>
					</>
				}
				onClick={FindClassroomClickFn}
			/>
		</nav>
	);
}
