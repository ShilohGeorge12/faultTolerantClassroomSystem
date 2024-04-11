'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const Controls = () => {
	const { push } = useRouter();
	const { get } = useSearchParams();
	const page = get('page') ?? '0';
	const perPage = get('perpage') ?? '5';

	return (
		<section className='flex gap-2 items-center justify-center'>
			<button
				type='button'
				name={`Prev Page`}
				className={`bg-black p-1 rounded-lg transition ease-in-out duration-500 hover:scale-105 hover:bg-gray-400 text-white`}
				onClick={() => push(`/settings?page=${Number(page) - 1}&perpage=${perPage}`)}>
				Prev Page
			</button>
			<p className='text-lg font-medium'>
				{Number(page) + 1} / {Math.ceil(10 / Number(perPage))}
			</p>
			<button
				type='button'
				name={`Next Page`}
				className={`bg-black p-1 rounded-lg transition ease-in-out duration-500 hover:scale-105 hover:bg-gray-400 text-white`}
				onClick={() => push(`/settings?page=${Number(page) + 1}&perpage=${perPage}`)}>
				Next Page
			</button>

			<p className=''>{page}</p>
			<p className=''>{perPage}</p>
		</section>
	);
};
