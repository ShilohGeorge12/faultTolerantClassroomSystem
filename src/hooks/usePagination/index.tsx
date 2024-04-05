'use client';
import { useGlobals } from '@/context';
import { PaginationType, isError, isPagClassrooms, responseTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

const fetcher = async (url: string) => {
	const res = await fetch(url);
	return res.json() as unknown as responseTypes;
};

export const usePagination: PaginationType = (options) => {
	const { classrooms, limitPerPage, totalClassrooms } = options;
	const [Page, setPage] = useState<number>(1);
	const { push } = useRouter();
	const { dispatch } = useGlobals();

	const onPageChange = async (page: number) => {
		const url = `/api/classrooms?page=${page - 1}&perpage=${limitPerPage}`; // Construct URL
		const { data, error } = useSWR(
			url, // Conditional URL with filters
			fetcher, // Define fetcher function below
			{ revalidateOnFocus: false } // Disable revalidation on focus for pagination
		);

		if (data && isError(data)) {
			const error = typeof data.error === 'string' ? data.error : data.error[0];
			toast.error(error);
			// dispatch({ type: 'logOut', payload: { isloggedIn: false } });
			// push('/login');
			return;
		}

		// if (data && isAuthStatus(res) && res.authStatus === 'invalid token') {
		// 	dispatch({ type: 'logOut', payload: { isloggedIn: false } });
		// 	push('/login');
		// 	return;
		// }

		if (data && isPagClassrooms(data)) {
			dispatch({
				type: 'classrooms',
				payload: { classrooms: data.classrooms, totalClassrooms: data.totalClassrooms },
			});
		}
		if (error) {
			toast.error(error.message);
		}
		setPage(page);
	};

	const startIndex = (1 - 1) * limitPerPage;
	const endIndex = startIndex + limitPerPage;
	const paginatedData = classrooms.slice(startIndex, endIndex);
	const len = Math.ceil(totalClassrooms / limitPerPage);
	const pages = Array.from({ length: len }, (_, i) => i + 1);

	const PaginatedNav = () => {
		return (
			<ul className='flex gap-x-1 mx-auto overflow-hidden rounded-lg w-fit last:border-r-0 last:border-white'>
				{pages.map((page) => (
					<li
						key={page}
						className={`flex items-center justify-center px-2 py-[6px] transition duration-700 ease-in-out text-lg hover:scale-110 ${
							page === Page ? 'bg-blue-400 text-white' : 'bg-black text-white'
						}`}>
						<button
							type='button'
							className='w-full h-full font-bold'
							onClick={() => page !== Page && onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		);
	};

	return [PaginatedNav, paginatedData];
};
