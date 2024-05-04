import { Schema } from 'mongoose';
import { ValidationResult } from 'joi';

export type USER = {
	_id: string;
} & USER_DB;

export type CLASSROOM = {
	_id: string;
} & CLASSROOM_DB;

export type classroomStatusType = 'IN USE' | 'FREE';

export type USER_DB = {
	username: string;
	password: string;
	createdAt: Date;
};

export type CLASSROOM_DB = {
	name: string;
	tag: string;
	location: string;
	status: classroomStatusType;
	bookings: CLASSROOMBOOKING[];
};

export interface CLASSROOMBOOKING {
	startDate: Date;
	endDate: Date;
	startTime: string;
	endTime: string;
	userId: Schema.Types.ObjectId;
	createdAt: Date;
}

export type BOOKING_DB = {
	userId: Schema.Types.ObjectId;
	classroomId: Schema.Types.ObjectId;
	startTime: string;
	endTime: string;
	status: classroomStatusType;
};

// Context Types
export type stateAction =
	| { type: 'user'; payload: { user: USER } }
	| { type: 'logIn'; payload: { isloggedIn: true; user: USER } }
	| { type: 'logOut'; payload: { isloggedIn: false } }
	| { type: 'menu_open' }
	| { type: 'menu_close' }
	| { type: 'classrooms'; payload: { classrooms: CLASSROOM[] } }
	| { type: 'filteredClassrooms'; payload: { filteredClassrooms: CLASSROOM[]; totalfilteredClassrooms: number } };

export interface State {
	loggedIn: boolean;
	user: USER;
	classrooms: CLASSROOM[];
	filteredClassrooms: CLASSROOM[];
	totalfilteredClassrooms: number;
	menu: 'open' | 'close';
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;

export type UrlPath = '/classrooms' | '/find-classroom' | '/aboutus' | '/settings' | '/login';

interface PaginationOptions {
	classrooms: CLASSROOM[];
	limitPerPage: number;
	totalClassrooms: number;
	// setClassroom: Dispatch<SetStateAction<CLASSROOM[]>>;
	// setTotalClassroom: Dispatch<SetStateAction<number>>;
	// isFetching:
	// setIsFetching: Dispatch<SetStateAction<'fetching' | 'idle'>>;
}

export type PaginationType = (options: PaginationOptions) => [() => JSX.Element, CLASSROOM[]];

// Http Response Type
interface paginatedClassrooms {
	classrooms: CLASSROOM[];
	totalClassrooms: number;
	perPage: number;
	page: number;
}

interface searchResult {
	q: string;
	classrooms: CLASSROOM[];
}

interface ErrorType {
	readonly error: string | string[];
}

interface StatusType {
	readonly status: string;
}
interface MessageType {
	readonly message: string;
}

type AuthStatusType = { readonly authStatus: 'invalid token'; readonly user: {} } | { readonly authStatus: 'Still Valid'; readonly user: USER };

export type responseTypes = USER | CLASSROOM | CLASSROOM[] | paginatedClassrooms | searchResult | StatusType | ErrorType | MessageType;

// Type Guards
export const isClassrooms = (_arg: responseTypes): _arg is CLASSROOM[] => {
	return _arg && (_arg as CLASSROOM[]).length !== undefined;
};

export const isClassroom = (_arg: responseTypes): _arg is CLASSROOM => {
	return _arg && (_arg as CLASSROOM).tag !== undefined && (_arg as CLASSROOM).location !== undefined && (_arg as CLASSROOM).name !== undefined;
};

export const isUser = (_arg: responseTypes): _arg is USER => {
	return _arg && (_arg as USER).username !== undefined && (_arg as USER).password !== undefined;
};

export const isPagClassrooms = (_arg: responseTypes): _arg is paginatedClassrooms => {
	return _arg && (_arg as paginatedClassrooms).page !== undefined && (_arg as paginatedClassrooms).perPage !== undefined;
};

export const isError = (_arg: responseTypes): _arg is ErrorType => (_arg as ErrorType).error !== undefined;
export const isMessage = (_arg: responseTypes): _arg is MessageType => (_arg as MessageType).message !== undefined;
export const isSearchResult = (_arg: responseTypes): _arg is searchResult => (_arg as searchResult).classrooms !== undefined && (_arg as searchResult).q !== undefined;

// Validation Types
export const MAX_AGE = 30 * 60;
export const COOKIE_NAME = 'key';
export type userValidation = Omit<USER_DB, 'createdAt'>;
export type userValidationReturnType = ValidationResult<Omit<USER_DB, 'createdAt'>>;
export type classroomValidation = Omit<CLASSROOM, '_id'>;
export type classroomValidationReturnType = ValidationResult<Omit<CLASSROOM, '_id'>>;
export type classroomBookingValidation = Omit<CLASSROOMBOOKING, 'createdAt'>;
export type classroomBookingValidationReturnType = ValidationResult<Omit<CLASSROOMBOOKING, 'createdAt'>>;
export type authvalidation = Omit<USER_DB, 'createdAt'>;
export type authValidationReturnType = ValidationResult<Omit<USER_DB, 'createdAt'>>;

// Input Validation Types
export const USERNAME_REGEX = /^[a-zA-Z\s_-]{2,}$/;
export const NAME_REGEX = /^[a-zA-Z\s\d]{2,}$/;
export const PASSWORD_REGEX = /^[a-zA-Z0-9@_-\s]{6,24}$/;
export const LOCATION_REGEX = /^[a-zA-Z0-9\s]{6,15}$/;
export const TAG_REGEX = /^[a-zA-Z0-9-]{8,10}$/;
export const PASSWORD_FORMAT_MESSAGE = `Password must be 6-24 characters long and can only contain letters, numbers, @, _, or -.`;

// session Types
export type sessionType = {
	user: {
		username: USER_DB['username'];
	};
	expires: Date;
	iat: any;
	exp: any;
};

// action types
export type loginDetails = {
	username: USER_DB['username'];
};

export type onEditProfileDetails = {
	username: USER_DB['username'];
	newUsername?: USER_DB['username'];
	newPassword?: USER_DB['password'];
};
