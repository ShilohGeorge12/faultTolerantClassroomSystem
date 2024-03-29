import { Schema } from 'mongoose';

export type USER = {
	_id: string;
};

export type USER_DB = {
	username: string;
	password: string;
	role: 'Admin' | 'Class Representative' | 'Lecturer';
	createdAt: Date;
};

export type CLASSROOM_DB = {
	name: string;
	tag: string;
	location: string;
};

export type BOOKING_DB = {
	userId: Schema.Types.ObjectId;
	classroomId: Schema.Types.ObjectId;
	startTime: Date;
	endTime: Date;
	status: 'IN USE' | 'FREE';
};

export type UrlPath = '/' | '/find-classroom' | '/aboutus';
