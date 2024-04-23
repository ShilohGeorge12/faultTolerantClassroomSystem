'use client';
import type { CLASSROOM } from '@/types';
import { useParams, useRouter } from 'next/navigation';

interface classroomProps<> {
	classrooms: CLASSROOM[];
}

export function Classrooms({ classrooms }: classroomProps) {
	const { push } = useRouter();
	const { page } = useParams();

	return (
		<div className='grid grid-cols-2 gap-y-6 gap-x-5 md:grid-cols-4 h-fit place-items-center'>
			{classrooms.map((classroom) => (
				<figure
					key={classroom._id}
					// onClick={() => onCreateClassroom(classroom)}
					onClick={() => push(`/classrooms/${page ?? 1}/${classroom._id}`)}
					className='bg-gray-200 flex flex-col rounded-2xl md:rounded-3xl p-3 transition duration-500 ease-linear hover:scale-105 h-40 w-44 md:h-52 md:w-64'>
					{classroom.tag}
				</figure>
			))}
		</div>
	);
}
