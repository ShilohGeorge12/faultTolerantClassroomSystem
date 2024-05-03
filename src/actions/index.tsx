'use server';

import { MongoDB } from '@/db';
// import { redirect } from 'next/navigation';
import { login, logout } from '@/lib/sessions';
import { loginDetails } from '@/types';

export const onLoginAction = async ({ username }: loginDetails) => {
	const checkUser = await MongoDB.getUser().findOne({ username });
	if (!checkUser) {
		return 'invalid login credentials';
	}

	await login({
		username,
	});
	// redirect('/home');
};

export const onLogoutAction = async () => {
	await logout();
	// redirect('/home');
};
