import { ZodSchema } from 'zod';
import { ApiError } from '~/api/responses';
import {
	positiveNumberSchema,
	refreshSessionSchema,
	sessionSchema,
	signInSchema,
	signUpSchema,
	updateCommunitySchema,
	updateUserSchema,
	uuidSchema,
} from '~/schemas';

const validateData = <T>(data: unknown, schema: ZodSchema<T>) => {
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		throw ApiError.zod(parsed.error);
	}

	return parsed.data;
};

const validateUuid = (id: unknown) => validateData(id, uuidSchema);

const validatePositiveNumber = (val: number | string) => {
	let num = val;

	if (typeof num === 'string') {
		num = parseInt(num);
	}

	return validateData(num, positiveNumberSchema);
};

const validateSignUpData = (data: unknown) => validateData(data, signUpSchema);

const validateSignInData = (data: unknown) => validateData(data, signInSchema);

const validateRefreshData = (data: unknown) =>
	validateData(data, refreshSessionSchema);

const validateSessionData = (data: unknown) =>
	validateData(data, sessionSchema);

const validateUpdateUserData = (data: unknown) =>
	validateData(data, updateUserSchema);

const validateUpdateCommunityData = (data: unknown) =>
	validateData(data, updateCommunitySchema);

export const validationService = {
	validateUuid,
	validatePositiveNumber,
	validateSignUpData,
	validateSignInData,
	validateRefreshData,
	validateSessionData,
	validateUpdateUserData,
	validateUpdateCommunityData,
};
