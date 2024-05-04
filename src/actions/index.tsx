'use server';

import { MongoDB } from '@/db';
import { login, logout } from '@/lib/sessions';
import { loginDetails, onEditProfileDetails } from '@/types';

export const onLoginAction = async ({ username }: loginDetails) => {
	const checkUser = await MongoDB.getUser().findOne({ username });
	if (!checkUser) {
		return 'invalid login credentials';
	}

	await login({
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
