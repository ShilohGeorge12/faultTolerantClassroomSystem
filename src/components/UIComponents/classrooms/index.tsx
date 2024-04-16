'use client';
import type { CLASSROOM } from '@/types';
import { useParams, useRouter } from 'next/navigation';

interface classroomProps<> {
	classrooms: CLASSROOM[];
}

export function Classrooms({ classrooms }: classroomProps) {
	const { push } = useRouter();
	const { page } = useParams();
	const onCreateClassroom = async (classroom: CLASSROOM) => {
		const formData = new FormData();
		Object.entries(classroom).forEach(([key, val]) => {
			console.log(key);
			if (key === '_id') return;
			formData.append(key, val);
		});

		const req = fetch('http://localhost:2024/api/classrooms', {
			method: 'POST',
			body: formData,
		});
		const res = (await req).json();
		console.log(res);
	};

	return (
		<div className='grid grid-cols-2 gap-y-6 gap-x-5 md:grid-cols-4 h-fit place-items-center'>
			{classrooms.map((classroom) => (
				<figure
					key={classroom._id}
					// onClick={() => onCreateClassroom(classroom)}
					onClick={() => push(`/classrooms/${page}/${classroom._id}`)}
					className='bg-gray-200 flex flex-col rounded-2xl md:rounded-3xl p-3 transition duration-500 ease-linear hover:scale-105 h-40 w-44 md:h-52 md:w-64'>
					{classroom.tag}
				</figure>
			))}
		</div>
	);
}
