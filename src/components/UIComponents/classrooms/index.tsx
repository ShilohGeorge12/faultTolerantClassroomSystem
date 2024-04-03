'use client';

import { CLASSROOM } from '@/types';

interface classroomProps {
	classrooms: CLASSROOM[];
}

export function Classrooms({ classrooms }: classroomProps) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-3 size-full items-center min-h-[60%] border border-black'>
			{classrooms.map((classroom) => (
				<div
					key={classroom._id}
					className='bg-gray-300 rounded-xl size-[80%] p-2 transition duration-500 ease-in-out hover:scale-105 hover:ring-1 hover:ring-gray-300'>
					{classroom.tag}
				</div>
			))}
		</div>
	);
}
