'use server';

import { MongoDB } from '@/db';
import { login, logout } from '@/lib/sessions';
import { deleteAccount, deleteClassroom, loginDetails, onEditClassroomDetails, onEditProfileDetails } from '@/types';

export const onLoginAction = async ({ username }: Omit<loginDetails, 'userId'>) => {
	const checkUser = await MongoDB.getUser().findOne({ username });
	if (!checkUser) {
		return 'invalid login credentials';
	}

	await login({
		userId: checkUser._id.toString(),
		username,
	});
};

export const onLogoutAction = async () => {
	await logout();
};

export const onEditProfileAction = async ({ username, newUsername, newPassword }: onEditProfileDetails) => {
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

		console.log(classroom);
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
		return null;
	} catch (e) {
		return e instanceof Error ? e.message : 'something went wrong';
	}
};

export const deleteClassroomAction = async ({ tag }: deleteClassroom) => {
	try {
		const classroom = await MongoDB.getClassroom().findOneAndDelete({ tag });
		if (!classroom) {
			return 'classroom was not found';
		}
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
