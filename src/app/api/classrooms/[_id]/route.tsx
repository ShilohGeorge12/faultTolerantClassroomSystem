import { MongoDB } from '@/db';
import { validateClassroomBooking } from '@/db/validators';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest, { params }: { params: { _id: string } }) => {
	try {
		const { _id } = params;
		const body = await req.formData();
		const bodyObj = Object.fromEntries(body.entries());
		const { error, value } = validateClassroomBooking(bodyObj);

		if (error) {
			console.log(error);
			const errArr: (string | null)[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}

		const classroom = await MongoDB.getClassroom().findOne({ _id });

		if (!classroom) return NextResponse.json({ error: 'Classroom specified was not found' }, { status: 404 });

		classroom.bookings.push({
			userId: value.userId,
			startDate: value.startDate,
			startTime: value.startTime,
			endDate: value.endDate,
			endTime: value.endTime,
			createdAt: new Date(),
		});

		console.log(classroom.bookings);
		await classroom.save();

		return NextResponse.json(classroom, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
