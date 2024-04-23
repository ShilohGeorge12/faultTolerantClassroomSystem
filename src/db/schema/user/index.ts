import { USER_DB } from '@/types';
import { Schema } from 'mongoose';

export function USER_DB_SCHEMA(): Schema<USER_DB> {
	return new Schema<USER_DB>({
		username: {
			type: String,
			minlength: 2,
			unique: true,
			required: [true, 'Username can not be empty'],
		},
		password: {
			type: String,
			minlength: 20,
			required: [true, 'Password Can not be empty'],
		},
		createdAt: {
			type: Date,
			default: () => new Date(),
		},
	});
}
