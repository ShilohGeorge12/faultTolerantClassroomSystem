'use client';

import Link from 'next/link';
import type { CLASSROOM } from '@/types';
import { useParams, useSearchParams } from 'next/navigation';

interface classroomProps<> {
	classrooms: CLASSROOM[];
	msg?: string;
}

export function Classrooms({ classrooms }: classroomProps) {
	const { page } = useParams();
	const { get } = useSearchParams();

	return (
		<div
			className={`grid ${
				classrooms.length === 0 ? 'grid-cols-1 justify-items-center' : 'grid-cols-2 md:grid-cols-4 place-items-center'
			} gap-y-6 gap-x-5 h-fit min-h-[75vh]`}>
			{classrooms.length > 0 &&
				classrooms.map((classroom) => (
					<Link
						key={classroom._id}
						href={`/classrooms/${page ?? 1}/${classroom._id}`}
						prefetch={false}
						className='bg-gray-200 flex flex-col rounded-2xl md:rounded-3xl p-3 transition duration-500 ease-linear hover:scale-105 hover:shadow-lg hover:shadow-gray-200 h-40 md:h-52 w-full'>
						{classroom.tag}
					</Link>
				))}

			{classrooms.length === 0 && <p className='text-gray-400 font-semibold tracking-widest text-lg capitalize mt-10'>there are no {get('q')} classrooms</p>}
		</div>
	);
}
