'use client';
import { formatCurrentTime } from '@/components/functionalComponents/formatCurrentTime';
// import { Classrooms } from '../classrooms';
import { useSearchParams } from 'next/navigation';
import { FilterButton } from '../button';
import { useGlobals } from '@/context';
import { Fragment, useEffect } from 'react';
// import { usePagination } from '@/hooks/usePagination';
import { CLASSROOM, isError, isPagClassrooms, responseTypes } from '@/types';
import { toast } from 'sonner';
import { Classrooms } from '../classrooms';
import { PaginationControls } from '@/components/functionalComponents/paginationControls';

interface HomePageClientProps {
	totalClassrooms: number;
	classrooms: CLASSROOM[];
	page: number;
}

export function HomePageClient({ totalClassrooms, classrooms, page }: HomePageClientProps) {
	const {
		state: {
			user: { username },
			filteredClassrooms,
			totalfilteredClassrooms,
		},
		dispatch,
	} = useGlobals();
	const time = formatCurrentTime();
	const meridiem = time.split(' ');
	const searchParams = useSearchParams();
	const params = searchParams.get('q');
	const filters = ['all', 'available', 'occupied'];
	const H3Classes = `font-bold text-xl capitalize text-black`;
	const filterClasses = 'bg-black hover:bg-gray-400';
	// const [Nav, data] = usePagination({
	// 	classrooms: !params || params === 'all' ? classrooms : filteredClassrooms,
	// 	limitPerPage,
	// 	totalClassrooms,
	// });

	useEffect(() => {
		let query: string = '';
		if (params === 'available') query = 'FREE';
		if (params === 'occupied') query = 'IN USE';
		fetch(`/api/classrooms?${params && params !== 'all' && 'f=' + query}`)
			.then((req) => req.json())
			.then((res: responseTypes) => {
				if (isError(res)) {
					const error = typeof res.error === 'string' ? res.error : res.error[0];
					toast.error(error);
					// dispatch({ type: 'logOut', payload: { isloggedIn: false } });
					// push('/login');
					return;
				}

				// if (isAuthStatus(res) && res.authStatus === 'invalid token') {
				// 	dispatch({ type: 'logOut', payload: { isloggedIn: false } });
				// 	push('/login');
				// 	return;
				// }

				if (isPagClassrooms(res)) {
					dispatch({
						type: 'filteredClassrooms',
						payload: { filteredClassrooms: res.classrooms, totalfilteredClassrooms: res.totalClassrooms },
					});
				}
			})
			.catch((err: Error) => toast.error(err.message));
	}, [params]);

	return (
		<>
			<section className='w-full h-full px-2 md:px-4 pt-2 flex flex-col gap-y-3 overflow-hidden'>
				{meridiem.includes('AM') && <h3 className={H3Classes}>Good Morning, {username}</h3>}
				{meridiem.includes('PM') && <h3 className={H3Classes}>Good Day, {username}</h3>}
				<div className='flex gap-2 md:gap-3 items-center mb-2'>
					<p className='font-medium md:text-base text-sm'>Filter Classrooms By</p>
					{filters.map((filter) => (
						<Fragment key={filter}>
							{filter === 'all' && (
								<FilterButton
									// key={filter}
									value={filter}
									page={page}
									more={filter === params || !params ? 'bg-blue-500' : filterClasses}
								/>
							)}
							{filter !== 'all' && (
								<FilterButton
									// key={filter}
									value={filter}
									page={page}
									more={filter === params ? 'bg-blue-500' : filterClasses}
								/>
							)}
						</Fragment>
					))}
				</div>
				<Classrooms classrooms={!params || params === 'all' ? classrooms : filteredClassrooms} />
				<PaginationControls totalClassrooms={!params || params === 'all' ? totalClassrooms : totalfilteredClassrooms} />
			</section>
		</>
	);
}

// implement caching in the pagination
