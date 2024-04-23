import { MongoDB } from '@/db';
import { validateAuth } from '@/db/validators';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.formData();
		const bodyObj = Object.fromEntries(body.entries());
		const { error, value } = validateAuth(bodyObj);

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		const user = await MongoDB.getUser().findOne({ username: value.username, password: value.password });

		if (!user) {
			return NextResponse.json({ error: 'invalid logout credentials' }, { status: 400 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
