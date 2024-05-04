'use client';

import { isError, responseTypes } from '@/types';
import { toast } from 'sonner';

export const createUser = async () => {
	const user = {
		username: 'admin',
		password: 'admin@0',
	};
	const form = new FormData();
	Object.entries(user).forEach(([key, val]) => form.append(key, val));
	const req = await fetch('/api/user', {
		method: 'POST',
		body: form,
	});

	const res = (await req.json()) as responseTypes;

	if (isError(res)) {
		const error = typeof res.error === 'string' ? res.error : res.error.join(' , ');
		toast.error(error);
		return;
	}
	console.log('working');
	return;
};
