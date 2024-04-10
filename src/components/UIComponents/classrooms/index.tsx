'use client';
import { CLASSROOM } from '@/types';

interface classroomProps {
	classrooms: CLASSROOM[];
}

export function Classrooms({ classrooms }: classroomProps) {
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
				<div
					key={classroom._id}
					// onClick={() => onCreateClassroom(classroom)}
					className='bg-gray-200 flex rounded-2xl p-2 size-40 md:h-52 md:w-64 transition duration-500 ease-in-out hover:scale-105 hover:ring-1 hover:ring-gray-300'>
					{classroom.tag}
				</div>
			))}
		</div>
	);
}
