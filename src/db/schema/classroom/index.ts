import { CLASSROOM_DB } from '@/types';
import { Schema } from 'mongoose';

export function CLASSROOM_DB_SCHEMA(): Schema<CLASSROOM_DB> {
	return new Schema<CLASSROOM_DB>({
		name: { type: String, required: true },
		tag: { type: String, required: true },
		location: { type: String, required: true },
		status: { type: String, enum: ['FREE', 'IN USE'], required: [true, 'Classroom Status is required'] },
	});
}
