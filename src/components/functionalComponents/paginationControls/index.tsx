'use client';

import { useParams, useRouter } from 'next/navigation';

interface ControlsProps {
	totalClassrooms: number;
}

export function PaginationControls({ totalClassrooms }: ControlsProps) {
	const { push } = useRouter();
	const params = useParams();
	const perPage = 8;
	const len = Math.ceil(totalClassrooms / perPage);

	return (
		<section className='flex gap-2 p-2 items-center justify-center'>
			<button
				type='button'
				name={`Prev Page`}
				className={`bg-black p-2 rounded-lg transition ease-in-out duration-500 hover:scale-105 hover:bg-blue-400 text-white disabled:bg-gray-400`}
				onClick={() => push(`/classrooms/${Number(params.page) - 1}`)}
				disabled={Number(params.page) <= 1}>
				Prev Page
			</button>
			<p className='text-lg font-medium'>
				{Number(params.page)} / {Math.ceil(totalClassrooms / perPage)}
			</p>
			<button
				type='button'
				name={`Next Page`}
				className={`bg-black p-2 rounded-lg transition ease-in-out duration-500 hover:scale-105 hover:bg-blue-400 text-white disabled:bg-gray-400`}
				onClick={() => push(`/classrooms/${Number(params.page) + 1}`)}
				disabled={Number(params.page) >= len}>
				Next Page
			</button>
		</section>
	);
}
