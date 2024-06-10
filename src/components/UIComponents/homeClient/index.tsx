import { formatCurrentTime } from '@/components/functionalComponents/formatCurrentTime';
import { PaginationControls } from '@/components/functionalComponents/paginationControls';
import { CLASSROOM } from '@/types';
import { Classrooms } from '../classrooms';

interface HomePageClientProps {
	totalClassrooms: number;
	classrooms: CLASSROOM[];
	page: number;
	username: string;
}

export function HomePageClient({ totalClassrooms, classrooms, username }: HomePageClientProps) {
	const time = formatCurrentTime();
	const meridiem = time.split(' ');
	const H3Classes = `font-bold text-xl capitalize text-black`;

	return (
		<section className='w-full h-full px-2 md:px-4 pt-2 flex flex-col gap-y-3 overflow-hidden'>
			{meridiem.includes('AM') && <h3 className={H3Classes}>Good Morning, {username}</h3>}
			{meridiem.includes('PM') && <h3 className={H3Classes}>Good Day, {username}</h3>}
			<Classrooms classrooms={classrooms} />
			<PaginationControls totalClassrooms={totalClassrooms} />
		</section>
	);
}
