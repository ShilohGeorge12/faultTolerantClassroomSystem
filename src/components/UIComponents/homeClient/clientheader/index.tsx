'use client';

import { useEffect, useState } from 'react';
import { useGlobals } from '@/context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CLASSROOM, isError, isSearchResult, responseTypes } from '@/types';

import { Classrooms } from '@/components/UIComponents/classrooms';
import { AsideDrawer } from '../../Drawer';

import { useDebounce } from 'use-debounce';
import { toast } from 'sonner';
import { FiMenu } from 'react-icons/fi';
import { FaX } from 'react-icons/fa6';

interface HomeClientHeaderProps {
	username: string;
}

export function HomeClientHeader({ username }: HomeClientHeaderProps) {
	const {
		state: { menu },
		dispatch,
	} = useGlobals();
	// const { push } = useRouter();
	// const pathname = usePathname();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [query] = useDebounce(searchQuery, 600);
	const [results, setResults] = useState<CLASSROOM[]>([]);
	const [fetchStatus, setFetchStatus] = useState<'idle' | 'fetching'>('idle');

	const onMenu = () => {
		menu === 'close' ? dispatch({ type: 'menu_open' }) : dispatch({ type: 'menu_close' });
	};

	useEffect(() => {
		if (query === '') {
			setSearchQuery('');
			setResults([]);
			// push(pathname, { scroll: false });
			return;
		}

		if (query !== '') {
			// push(`${pathname}?q=${query.replace(/\s/g, '_').toUpperCase()}`, { scroll: false });
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

	return (
		<>
			<section className='w-full flex gap-2 items-center py-2 px-3 md:px-4 justify-between'>
				<AsideDrawer title='Search for a Classroom'>
					<form className='w-full flex flex-col justify-centers items-center gap-4 h-full '>
						<div className='md:w-[60%] w-[90%] h-11'>
							<input
								type='text'
								name='search classrooms'
								className='w-full h-full bg-gray-100 text-gray-500 placeholder-gray-500 tracking-wider placeholder:tracking-wider font-medium text-base md:text-lg outline-0 hover:ring-2 focus:ring-4 ring-gray-200 rounded-xl px-3'
								placeholder='Enter Classroom Tag...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>

						{fetchStatus === 'idle' && query !== '' && results.length === 0 && (
							<div className='md:w-[60%] w-[90%] flex flex-col items-center'>
								<p className='text-base text-gray-500'>&quot;{query}&quot; Was Not Found</p>
							</div>
						)}

						{fetchStatus === 'idle' && results.length > 0 && (
							<div className='md:w-[85%] w-[90%] h-full overflow-y-scroll pb-20'>
								<Classrooms classrooms={results} />
							</div>
						)}
					</form>
				</AsideDrawer>

				{/* <span /> */}
				<div className='flex items-center gap-2 md:gap-1 hover:scale-105 transition duration-500 ease-in-out'>
					<div className='w-full flex items-center justify-center '>
						<div className='size-7 border-[3px] bg-gray-200 border-gray-400 rounded-full flex items-center justify-center text-base font-bold text-gray-500'>
							{username[0]}
						</div>
					</div>
					<button
						type='button'
						name={`Toggle Menu Button`}
						className={`text-xl md:hidden flex`}
						onClick={onMenu}>
						{menu === 'close' ? <FiMenu /> : <FaX />}
					</button>
				</div>
			</section>
			<hr className='w-[95%] border-[1.5px] mt-1 rounded mx-auto' />
		</>
	);
}
