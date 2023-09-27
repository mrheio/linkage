import { ZodSchema } from 'zod';
import { ApiError } from '~/api/responses';
import {
	addCommunitySchema,
	addPostSchema,
	createCommentSchema,
	positiveNumberSchema,
	refreshSessionSchema,
	sessionSchema,
	signInSchema,
	signUpSchema,
	updateCommentSchema,
	updateCommunitySchema,
	updatePostSchema,
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

const validatePositiveNumber = (val: unknown) => {
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

const validateAddCommunityData = (data: unknown) =>
	validateData(data, addCommunitySchema);

const validateUpdateCommunityData = (data: unknown) =>
	validateData(data, updateCommunitySchema);

const validateAddPostData = (data: unknown) =>
	validateData(data, addPostSchema);

const validateUpdatePostData = (data: unknown) =>
	validateData(data, updatePostSchema);

const validateCreateCommentData = (data: unknown) =>
	validateData(data, createCommentSchema);

const validateUpdateCommentData = (data: unknown) =>
	validateData(data, updateCommentSchema);

export const validationService = {
	validateUuid,
	validatePositiveNumber,
	validateSignUpData,
	validateSignInData,
	validateRefreshData,
	validateSessionData,
	validateUpdateUserData,
	validateAddCommunityData,
	validateUpdateCommunityData,
	validateAddPostData,
	validateUpdatePostData,
	validateCreateCommentData,
	validateUpdateCommentData,
};
