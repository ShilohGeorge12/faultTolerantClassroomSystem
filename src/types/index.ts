import { Schema } from 'mongoose';

export type USER = {
	_id: string;
} & USER_DB;

export type CLASSROOM = {
	_id: string;
} & CLASSROOM_DB;

export type USER_DB = {
	username: string;
	password: string;
	role: 'admin' | 'guest';
	createdAt: Date;
};

export type CLASSROOM_DB = {
	name: string;
	tag: string;
	location: string;
	status: 'IN USE' | 'FREE';
};

export type BOOKING_DB = {
	userId: Schema.Types.ObjectId;
	classroomId: Schema.Types.ObjectId;
	startTime: Date;
	endTime: Date;
	status: 'IN USE' | 'FREE';
};

// Context Types
export type stateAction =
	| { type: 'user'; payload: { user: USER } }
	| { type: 'logIn'; payload: { isloggedIn: true; user: USER } }
	| { type: 'logOut'; payload: { isloggedIn: false } }
	| { type: 'menu_open' }
	| { type: 'menu_close' };

export interface State {
	loggedIn: boolean;
	user: USER;
	classrooms: CLASSROOM[];
	menu: 'open' | 'close';
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;

export type UrlPath = '/' | '/find-classroom' | '/aboutus' | '/settings' | '/login';
