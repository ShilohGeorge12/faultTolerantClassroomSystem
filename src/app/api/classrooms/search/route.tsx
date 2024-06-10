import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	try {
		const query = req.nextUrl.searchParams.get('q');

		if (query) {
			const classrooms = await MongoDB.getClassroom()
				.find({ tag: { $regex: `^${query.replace(/_/g, ' ')}`, $options: 'i' } })
				.sort('name -__v')
				// .skip(page * perPage)
				.limit(8)
				.select('-__v');
			return NextResponse.json({ q: query, classrooms });
		}

		return NextResponse.json({ error: 'search query was undefined' }, { status: 400 });
	} catch (error) {
		error instanceof Error && console.warn({ message: error.message });
		return NextResponse.json(error instanceof Error ? error.message : error, { status: 500 });
	}
};
