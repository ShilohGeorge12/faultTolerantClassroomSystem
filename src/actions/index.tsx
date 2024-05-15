'use server';

import { MongoDB } from '@/db';
import { login, logout } from '@/lib/sessions';
import {
	addClassroomDetails,
	bookClassroom,
	createUserDetails,
	deleteAccount,
	deleteClassroom,
	loginDetails,
	onEditClassroomDetails,
	onEditProfileDetails,
} from '@/types';
import { revalidatePath } from 'next/cache';

export const onLoginAction = async ({ username }: Pick<loginDetails, 'username'>) => {
	const checkUser = await MongoDB.getUser().findOne({ username });
	if (!checkUser) {
		return 'invalid login credentials';
	}

	await login({
		userId: checkUser._id.toString(),
		username,
		role: checkUser.role,
	});
};

export const onLogoutAction = async () => {
	await logout();
};

export const onEditProfileAction = async ({ path, username, newUsername, newPassword }: onEditProfileDetails) => {
	try {
		const user = await MongoDB.getUser().findOne({ username });
		if (!user) {
			return 'user profile was not found';
		}

		if (newUsername) {
			user.username = newUsername;
		}

		if (newPassword && user.password !== newPassword) {
			user.password = newPassword;
		}

		user.save();
		await login({
			userId: user._id.toString(),
			username: user.username,
			role: user.role,
		});
		revalidatePath(path);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const onEditClassroomAction = async ({ _id, newLocation, newName, newTag }: onEditClassroomDetails) => {
	try {
		const classroom = await MongoDB.getClassroom().findOne({ _id });
		if (!classroom) {
			return 'classroom was not found';
		}

		if (newName) {
			classroom.name = newName;
		}

		if (newLocation) {
			classroom.location = newLocation;
		}

		if (newTag) {
			classroom.tag = newTag;
		}

		classroom.save();
		revalidatePath(`/classrooms/1/${classroom._id}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const deleteClassroomAction = async ({ _id }: deleteClassroom) => {
	try {
		const classroom = await MongoDB.getClassroom().findOneAndDelete({ _id });
		if (!classroom) {
			return 'classroom was not found';
		}

		revalidatePath(`/classrooms/1/${classroom._id}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const deleteAccountAction = async ({ userId }: deleteAccount) => {
	try {
		const user = await MongoDB.getUser().findByIdAndDelete({ _id: userId });
		if (!user) {
			return 'user does not exist';
		}
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const bookClassroomAction = async ({ _id, userId, endTime, date, startTime }: bookClassroom) => {
	try {
		const classroomPromise = MongoDB.getClassroom().findOne({ _id }); //'bookings.date': date });
		const userPromise = MongoDB.getUser().findOne({ _id: userId });
		const [classroom, user] = await Promise.all([classroomPromise, userPromise]);
		if (!classroom) return 'Classroom specified was not found';
		if (!user) return 'User making this booking was not found';

		const existingBookings = classroom.bookings.filter((booking) => booking.date === date);
		// Perform validation for each classroom with bookings for the same date
		for (const existingBooking of existingBookings) {
			const existingStartTime = new Date(existingBooking.startTime);
			const existingEndTime = new Date(existingBooking.endTime);

			// Extract time components
			const existingStartTimeMinutes = existingStartTime.getHours() * 60 + existingStartTime.getMinutes();
			const existingEndTimeMinutes = existingEndTime.getHours() * 60 + existingEndTime.getMinutes();
			const newStartTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
			const newEndTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();

			// Check for overlapping timeframes
			if (
				(newStartTimeMinutes >= existingStartTimeMinutes && newStartTimeMinutes < existingEndTimeMinutes) || // New booking start time falls within existing booking timeframe
				(newEndTimeMinutes > existingStartTimeMinutes && newEndTimeMinutes <= existingEndTimeMinutes) || // New booking end time falls within existing booking timeframe
				(newStartTimeMinutes <= existingStartTimeMinutes && newEndTimeMinutes >= existingEndTimeMinutes) // New booking completely overlaps with existing booking timeframe
			) {
				return 'This classroom is already booked for the selected time frame';
			}
		}

		classroom.bookings.push({
			userId: user._id,
			date,
			startTime,
			endTime,
			createdAt: new Date(),
		});

		await classroom.save();
		revalidatePath(`/classrooms/1/${_id}`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

// export const validateUniqueBooking = async (booking: Omit<CLASSROOMBOOKING, 'createdAt' | 'userId'> & { _id: string }) => {
// 	try {
// 		const { date, startTime, endTime, _id } = booking;

// 		const classroomsWithBookings = await MongoDB.getClassroom().findOne({ _id, 'bookings.date': date });

// 		if (!classroomsWithBookings) return 'classroom not found';

// 		// Perform validation for each classroom with bookings for the same date
// 		// for (const classroom of classroomsWithBookings) {
// 		for (const existingBooking of classroomsWithBookings.bookings) {
// 			const existingStartTime = new Date(existingBooking.startTime);
// 			const existingEndTime = new Date(existingBooking.endTime);

// 			// Extract time components
// 			const existingStartTimeMinutes = existingStartTime.getHours() * 60 + existingStartTime.getMinutes();
// 			const existingEndTimeMinutes = existingEndTime.getHours() * 60 + existingEndTime.getMinutes();
// 			const newStartTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
// 			const newEndTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();

// 			// Check for overlapping timeframes
// 			if (
// 				(newStartTimeMinutes >= existingStartTimeMinutes && newStartTimeMinutes < existingEndTimeMinutes) || // New booking start time falls within existing booking timeframe
// 				(newEndTimeMinutes > existingStartTimeMinutes && newEndTimeMinutes <= existingEndTimeMinutes) || // New booking end time falls within existing booking timeframe
// 				(newStartTimeMinutes <= existingStartTimeMinutes && newEndTimeMinutes >= existingEndTimeMinutes) // New booking completely overlaps with existing booking timeframe
// 			) {
// 				return 'This classroom is already booked for the selected dates';
// 			}
// 			// }
// 		}

// 		return 'good';
// 	} catch (error) {
// 		return error instanceof Error ? `${error.message}` : '';
// 	}
// };

export const AddClassroomAction = async ({ name, location, tag }: addClassroomDetails) => {
	try {
		const search = await MongoDB.getClassroom().findOne({
			$or: [{ name }, { tag }],
		});
		if (search) return `classroom ${name} already exist.`;

		await MongoDB.getClassroom().create({
			name,
			location,
			tag,
		});

		revalidatePath(`/classrooms/1`);
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const CreateUserAction = async ({ username, password, role }: createUserDetails) => {
	try {
		await MongoDB.getUser().create({
			username,
			password,
			role,
		});
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};
