'use client';
import { formatCurrentTime } from '@/components/functionalComponents/formatCurrentTime';
import { Classrooms } from '../classrooms';
import { useSearchParams } from 'next/navigation';
import { FilterButton } from '../button';
import { useGlobals } from '@/context';

export function HomePageClient() {
	const {
		state: { user, classrooms },
	} = useGlobals();
	const time = formatCurrentTime();
	const meridiem = time.split(' ');
	const searchParams = useSearchParams();
	const params = searchParams.get('q');
	const filters = ['all', 'available', 'occupied'];
	const H3Classes = `font-bold text-xl capitalize text-black`;
	const filterClasses = 'bg-black hover:bg-gray-400';
	const { username } = user;

	return (
		<section className='w-full h-full px-4 pt-2'>
			{meridiem.includes('AM') && <h3 className={H3Classes}>Good Morning, {username}</h3>}
			{meridiem.includes('PM') && <h3 className={H3Classes}>Good Day, {username}</h3>}
			<div className='flex gap-2 items-center'>
				<p className='font-medium text-base'>Filter classrooms By</p>
				{filters.map((filter) => (
					<>
						{filter === 'all' && (
							<FilterButton
								key={filter}
								value={filter}
								more={filter === params || !params ? 'bg-blue-500' : filterClasses}
							/>
						)}
						{params && filter !== 'all' && (
							<FilterButton
								key={filter}
								value={filter}
								more={filter === params ? 'bg-blue-500' : filterClasses}
							/>
						)}
					</>
				))}
			</div>
			<Classrooms classrooms={classrooms} />
		</section>
	);
}
