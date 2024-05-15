import { MongoDB } from '@/db';
import { validateUser } from '@/db/validators';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.formData();
		const bodyObj = Object.fromEntries(body.entries());
		const { error, value } = validateUser(bodyObj);

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		const user = await MongoDB.getUser().create({
			password: value.password,
			username: value.username,
			createdAt: new Date(),
		});

		return NextResponse.json({ username: user.username, createAt: user.createdAt }, { status: 201 });
	} catch (error) {
		if (error instanceof Error && error.name === 'MongoServerError') {
			console.log(error.message);
			return NextResponse.json({ error: 'username already exist, please use a different username' }, { status: 400 });
		}
		if (error instanceof Error) {
			console.log(error.message);
			return NextResponse.json({ error: error.name }, { status: 400 });
		}

		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
