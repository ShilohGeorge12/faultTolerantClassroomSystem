'use client';

import { CLASSROOM } from '@/types';

interface classroomProps {
	classrooms: CLASSROOM[];
}

export function Classrooms({ classrooms }: classroomProps) {
	return (
		// <div className='grid grid-cols-2 md:grid-cols-3 w-full h-full overflow-y-scroll items-center border border-black'>
		<div className='grid grid-cols-1 gap-2 md:grid-cols-4 border h-fit border-black'>
			{classrooms.map((classroom) => (
				<div
					key={classroom._id}
					className='bg-gray-300 flex rounded-xl p-2 size-52 transition duration-500 ease-in-out hover:scale-105 hover:ring-1 hover:ring-gray-300'>
					{classroom.tag}
				</div>
			))}
		</div>
	);
}
