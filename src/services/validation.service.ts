import { ZodSchema } from 'zod';
import { ApiError } from '~/api/responses';
import {
	addCommunitySchema,
	addPostSchema,
	commentSchema,
	communitySchema,
	createCommentSchema,
	positiveNumberSchema,
	postSchema,
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
import {
	apiErrorSchema,
	apiGetManySuccessSchema,
	apiSuccessSchema,
} from '~/schemas/api.schema';

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

const validateApiSuccess =
	<T>(schema: ZodSchema<T>) =>
	(data: unknown) =>
		validateData(data, apiSuccessSchema(schema));

const validateApiGetManySuccess =
	<T>(schema: ZodSchema<T>) =>
	(data: unknown) =>
		validateData(data, apiGetManySuccessSchema(schema));

const validateApiError = (data: unknown) => validateData(data, apiErrorSchema);

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
	validateApiError,
	validateApi: {
		communities: {
			get: {
				many: validateApiGetManySuccess(communitySchema),
				one: validateApiSuccess(communitySchema),
			},
		},
		posts: {
			get: {
				many: validateApiGetManySuccess(postSchema),
				one: validateApiSuccess(postSchema),
			},
		},
		comments: {
			get: {
				many: validateApiGetManySuccess(commentSchema),
			},
		},
	},
};
