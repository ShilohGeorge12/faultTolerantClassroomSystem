import {
	authValidationReturnType,
	authvalidation,
	classroomBookingValidation,
	classroomBookingValidationReturnType,
	classroomValidation,
	classroomValidationReturnType,
	userValidation,
	userValidationReturnType,
} from '@/types';
import joi from 'joi';

export function validateClassroom(schema: unknown): classroomValidationReturnType {
	const classroomSchema = joi.object<classroomValidation>({
		name: joi.string().min(2).required(),
		location: joi.string().min(4).required(),
		tag: joi.string().required().min(8),
	});
	return classroomSchema.validate(schema, { abortEarly: false });
}

// export function validateClassroomBooking(schema: unknown): classroomBookingValidationReturnType {
// 	const bookingSchema = joi.object<classroomBookingValidation>({
// 		userId: joi.string().required(),
// 		startDate: joi.string().required(),
// 		startTime: joi.string().required(),
// 		endDate: joi.string().required(),
// 		endTime: joi.string().required(),
// 	});
// 	return bookingSchema.validate(schema, { abortEarly: false });
// }

export function validateAuth(schema: unknown): authValidationReturnType {
	const authSchema = joi.object<authvalidation>({
		username: joi.string().min(2).required(),
		password: joi.string().min(6).required(),
	});
	return authSchema.validate(schema, { abortEarly: false });
}

export function validateUser(schema: unknown): userValidationReturnType {
	const userSchema = joi.object<userValidation>({
		username: joi.string().min(2).required(),
		password: joi.string().min(6).required(),
	});
	return userSchema.validate(schema, { abortEarly: false });
}

// export function validateUpdateUser(schema: unknown): validateUpdateUserType {
// 	const userSchema = joi.object<updateUserReturnType>({
// 		username: joi.string().min(2).max(25),
// 		email: joi.string().email().max(30),
// 		password: joi.string().min(2).max(24),
// 		image: joi.any(),
// 		gender: joi.string().valid('male', 'female'),
// 	});
// 	return userSchema.validate(schema, { abortEarly: false });
// }

// export function validateAnimes(schema: unknown): validateAnimesReturnType {
// 	const animeSchema = joi.object<animeReturnType>({
// 		title: joi.string().required(),
// 		description: joi.string().required(),
// 		episodes: joi.number().required(),
// 		year: joi.number().required(),
// 		airing: joi.boolean().required(),
// 		aired: joi.string().required(),
// 		duration: joi.string().required(),
// 		rating: joi.number().required(),
// 		image: joi
// 			.string()
// 			.min(2)
// 			.regex(/^[a-zA-Z_\-0-9.]{2,}$/),
// 		season: joi.string().valid('summer', 'spring', 'winter').required(),
// 		status: joi.string().valid('FinishedAiring', 'onGoing').required(),
// 	});
// 	return animeSchema.validate(schema, { abortEarly: false });
// }

// export function validateAuth(schema: unknown): validateAuthReturnType {
// 	const userSchema = joi.object<authReturnType>({
// 		username: joi.string().min(2).required(),
// 		// email: joi.string().email().required(),
// 		password: joi.string().min(2).required(),
// 	});
// 	return userSchema.validate(schema, { abortEarly: false });
// }
// export function validateAuthLogOut(schema: unknown): validateAuthLogOutReturnType {
// 	const userSchema = joi.object<authLogOutReturnType>({
// 		username: joi.string().min(2).required(),
// 		email: joi.string().email().required(),
// 	});
// 	return userSchema.validate(schema, { abortEarly: false });
// }

// export function validatePatch(schema: unknown): validatePatchReturnType {
// 	const userSchema = joi.object<patchReturnType>({
// 		theme: joi.string().valid('light', 'dark'),
// 	});
// 	return userSchema.validate(schema, { abortEarly: false });
// }
