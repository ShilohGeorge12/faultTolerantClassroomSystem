'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobals } from '@/context';
import { CLASSROOM, isError, isSearchResult, responseTypes, sessionType } from '@/types';
import { Classrooms } from '@/components/UIComponents/classrooms';
import { AddClassroom } from './addClassroom';
import { useDebounce } from 'use-debounce';
import { toast } from 'sonner';
import { FaPlus } from 'react-icons/fa';

interface FindClassroomsClientProps {
	session: sessionType | null;
}

export function FindClassroomsClient({ session }: FindClassroomsClientProps) {
	const {
		state: { loggedIn },
	} = useGlobals();
	const { push } = useRouter();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') ?? '');
	const [query] = useDebounce(searchQuery, 600);
	const [results, setResults] = useState<CLASSROOM[]>([]);
	const [fetchStatus, setFetchStatus] = useState<'idle' | 'fetching'>('idle');
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		if (query === '') {
			setSearchQuery('');
			setResults([]);
			push('/find-classroom', { scroll: false });
			return;
		}

		if (query !== '') {
			push(`/find-classroom?q=${query.replace(/\s/g, '_').toUpperCase()}`, { scroll: false });
			const fetchAnime = async () => {
				setFetchStatus('fetching');
				const req = await fetch(`/api/classrooms/search?q=${query}`);
				const res = (await req.json()) as responseTypes;
				if (isError(res)) {
					const error = typeof res.error === 'string' ? res.error : res.error.join(' ');
					toast.error(error);
					return;
				}

				if (isSearchResult(res)) {
					setResults(res.classrooms);
					return;
				}
			};
			fetchAnime()
				.catch((err) => err instanceof Error && toast.error(err.message))
				.finally(() => setFetchStatus('idle'));
		}
	}, [query]);

	const onAddClassroom = () => {
		if (!session) {
			toast.info(`only authorized users can add classrooms`);
			return;
		}
		setIsDialogOpen(true);
	};

	return (
		<>
			<section className='md:w-[60%] w-[90%] min-h-16 flex gap-2 rounded-3xl items-center justify-between bg-gray-200 py-2 px-4 hover:shadow-md'>
				<div className='w-[70%] h-full'>
					<input
						type='text'
						name='search classrooms'
						className='w-full h-full bg-transparent text-gray-500 placeholder-gray-500 tracking-wider placeholder:tracking-wider font-medium text-base md:text-lg outline-0'
						placeholder='Enter Classroom Tag...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<button
					type='button'
					className={`group text-base md:text-lg hover:w-[180px] size-9 hover:h-10 transition-all ease-in-out duration-700 flex items-center gap-3 justify-center bg-blue-400 text-white rounded-2xl overflow-hidden`}
					onClick={onAddClassroom}>
					<FaPlus />
					<span className={`hidden group-hover:block transition-all delay-50 duration-1000 ease-linear text-sm md:text-base text-nowrap`}>add classroom</span>
				</button>
			</section>

			{fetchStatus === 'idle' && query !== '' && results.length === 0 && <p className='text-base text-gray-500'>&quot;{query}&quot; Was Not Found</p>}

			{fetchStatus === 'idle' && results.length > 0 && <Classrooms classrooms={results} />}
			<AddClassroom
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
			/>
		</>
	);
}
