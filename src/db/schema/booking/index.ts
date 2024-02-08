import { BOOKING_DB } from '@/types';
import { Schema } from 'mongoose';

export function BOOKING_DB_SCHEMA(): Schema<BOOKING_DB> {
	return new Schema<BOOKING_DB>({
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		classroomId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
		startTime: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ['IN USE', 'FREE'],
			required: true,
		},
	});
}
