// db.ts
import mongoose, { Connection, Model } from 'mongoose';
import { env } from '@/env';
import type { USER_DB, BOOKING_DB, CLASSROOM_DB } from '@/types';
import { USER_DB_SCHEMA } from './schema/user';
import { CLASSROOM_DB_SCHEMA } from './schema/classroom';

class Database {
	private static instance: Database;
	private connection!: Connection;
	private userModel: Model<USER_DB>;
	private classroomModel: Model<CLASSROOM_DB>;

	private constructor() {
		this.connect();
		this.userModel = this.createUserModel();
		this.classroomModel = this.createClassroomModel();
	}

	private connect() {
		mongoose.set('strictQuery', false);
		this.connection = mongoose.createConnection(env.DATABASE_URL, {
			writeConcern: { w: 'majority' },
			retryWrites: true,
		});

		this.connection.on('error', (error) => {
			if (error instanceof Error) console.error('MongoDB connection error:', error.message);
		});

		this.connection.once('open', () => {
			console.log('Connected to MongoDB');
		});
	}

	private createUserModel(): Model<USER_DB> {
		const UserSchema = USER_DB_SCHEMA();
		return this.connection.model<USER_DB>('users', UserSchema);
	}

	private createClassroomModel(): Model<CLASSROOM_DB> {
		const ClassroomSchema = CLASSROOM_DB_SCHEMA();
		return this.connection.model<CLASSROOM_DB>('classrooms', ClassroomSchema);
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
}

export const MongoDB = Database.getInstance();
