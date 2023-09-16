import { ZodSchema } from 'zod';
import { ApiError } from '~/api/responses';
import {
	refreshSessionSchema,
	sessionSchema,
	signInSchema,
	signUpSchema,
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

const validateSignUpData = (data: unknown) => validateData(data, signUpSchema);

const validateSignInData = (data: unknown) => validateData(data, signInSchema);

const validateRefreshData = (data: unknown) =>
	validateData(data, refreshSessionSchema);

const validateSessionData = (data: unknown) =>
	validateData(data, sessionSchema);

const validateUpdateUserData = (data: unknown) =>
	validateData(data, updateUserSchema);

export const validationService = {
	validateUuid,
	validateSignUpData,
	validateSignInData,
	validateRefreshData,
	validateSessionData,
	validateUpdateUserData,
};
