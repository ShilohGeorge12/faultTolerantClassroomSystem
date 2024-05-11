'use client';

import Link from 'next/link';
import type { CLASSROOM } from '@/types';
import { useParams } from 'next/navigation';

interface classroomProps<> {
	classrooms: CLASSROOM[];
}

export function Classrooms({ classrooms }: classroomProps) {
	const { page } = useParams();

	return (
		<div className='grid grid-cols-2 gap-y-6 gap-x-5 md:grid-cols-4 h-fit place-items-center'>
			{classrooms.map((classroom) => (
				<Link
					key={classroom._id}
					href={`/classrooms/${page ?? 1}/${classroom._id}`}
					prefetch={false}
					className='bg-gray-200 flex flex-col rounded-2xl md:rounded-3xl p-3 transition duration-500 ease-linear hover:scale-105 hover:shadow-lg hover:shadow-gray-200 h-40 md:h-52 w-full'>
					{classroom.tag}
				</Link>
			))}
		</div>
	);
}
