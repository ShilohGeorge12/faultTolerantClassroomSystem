import { CLASSROOM_DB } from '@/types';
import { Schema } from 'mongoose';

export function CLASSROOM_DB_SCHEMA(): Schema<CLASSROOM_DB> {
	return new Schema<CLASSROOM_DB>({
		name: { type: String, required: [true, 'The classroom name is required'] },
		tag: { type: String, required: true },
		location: { type: String, required: [true, 'The classroom location is required'] },
		status: { type: String, enum: ['FREE', 'IN USE'], required: [true, 'Classroom Status is required'] },
		bookings: {
			type: [
				{
					startDate: {
						type: String,
						required: [true, 'The start date is required'],
					},
					endDate: {
						type: String,
						required: [true, 'The end date is required'],
					},
					startTime: {
						type: String,
						required: [true, 'The start time is required'],
					},
					endTime: {
						type: String,
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
