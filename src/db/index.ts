// db.ts
import mongoose, { Connection, Model } from 'mongoose';
import { env } from '@/env';
import type { USER_DB, BOOKING_DB, CLASSROOM_DB } from '@/types';
import { USER_DB_SCHEMA } from './schema/user';
import { BOOKING_DB_SCHEMA } from './schema/booking';
import { CLASSROOM_DB_SCHEMA } from './schema/classroom';

class Database {
	private static instance: Database;
	private connection!: Connection;
	private userModel: Model<USER_DB>;
	private bookingModel: Model<BOOKING_DB>;
	private classroomModel: Model<CLASSROOM_DB>;

	private constructor() {
		this.connect();
		this.userModel = this.createUserModel();
		this.bookingModel = this.createBookingModel();
		this.classroomModel = this.createClassroomModel();
	}

	private connect() {
		mongoose.set('strictQuery', false);
		this.connection = mongoose.createConnection(env.DATABASE_URL, {
			writeConcern: { w: 'majority' },
			retryWrites: true,
		});

		this.connection.on('error', (error) => {
			console.error('MongoDB connection error:', error);
		});

		this.connection.once('open', () => {
			console.log('Connected to MongoDB');
		});
	}

	private createUserModel(): Model<USER_DB> {
		const UserSchema = USER_DB_SCHEMA();
		return this.connection.model<USER_DB>('users', UserSchema);
	}

	private createBookingModel(): Model<BOOKING_DB> {
		const BookingSchema = BOOKING_DB_SCHEMA();
		return this.connection.model<BOOKING_DB>('users', BookingSchema);
	}

	private createClassroomModel(): Model<CLASSROOM_DB> {
		const ClassroomSchema = CLASSROOM_DB_SCHEMA();
		return this.connection.model<CLASSROOM_DB>('users', ClassroomSchema);
	}

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public getUser(): Model<USER_DB> {
		return this.userModel;
	}

	public getClassroom(): Model<CLASSROOM_DB> {
		return this.classroomModel;
	}

	public getBookings(): Model<BOOKING_DB> {
		return this.bookingModel;
	}
}

export const MongoDB = Database.getInstance();
