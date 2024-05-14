import { CLASSROOM_DB } from '@/types';
import { Schema } from 'mongoose';

export function CLASSROOM_DB_SCHEMA(): Schema<CLASSROOM_DB> {
	return new Schema<CLASSROOM_DB>({
		name: { type: String, unique: true, required: [true, 'The classroom name is required'] },
		tag: { type: String, unique: true, required: true },
		location: { type: String, required: [true, 'The classroom location is required'] },
		status: { type: String, enum: ['FREE', 'IN USE'], default: 'FREE' },
		bookings: {
			type: [
				{
					date: {
						type: Date,
						required: [true, 'The start date is required'],
					},
					startTime: {
						type: Date,
						required: [true, 'The start time is required'],
					},
					endTime: {
						type: Date,
						required: [true, 'The end time is required'],
					},
					createdAt: {
						type: Date,
						default: () => new Date(),
					},
					userId: {
						type: Schema.Types.ObjectId,
						ref: 'users',
						required: [true, 'The reference user ID is required'],
					},
				},
			],
			default: [],
		},
	});
}
