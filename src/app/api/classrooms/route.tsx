import { MongoDB } from '@/db';
import { validateClassroom } from '@/db/validators';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	// const classrooms = await MongoDB.getClassroom().find()//.sort('username').select('-__v -password').populate('animes', '-__v -password');

	try {
		const pageParams = req.nextUrl.searchParams.get('page');
		const perPageParams = req.nextUrl.searchParams.get('perpage');
		const page = pageParams ? parseInt(pageParams) : 0;
		const perPage = perPageParams ? parseInt(perPageParams) : 8;
		const totalClassrooms = (await MongoDB.getClassroom().find()).length;

		const classrooms = await MongoDB.getClassroom()
			.find()
			.sort('name -__v')
			.skip(page * perPage)
			.limit(perPage)
			.select('-__v');
		console.log('classroom(GET) ', page);
		return NextResponse.json({ classrooms, totalClassrooms, perPage, page });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.formData();
		const bodyObj = Object.fromEntries(body.entries());
		const { error, value } = validateClassroom(bodyObj);

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		const search = await MongoDB.getClassroom().findOne({ name: value.name });
		if (search) {
			return NextResponse.json({ message: `classroom ${value.name} already exist in our records.` }, { status: 201 });
		}

		const newClassroom = await MongoDB.getClassroom().create({
			name: value.name,
			location: value.location,
			status: value.status,
			tag: value.tag,
		});

		return NextResponse.json({ message: `Successfully created classroom ${newClassroom.name} record.` }, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
