import { ZodSchema } from 'zod';
import { ApiError } from '~/api/responses';
import { updateUserSchema, uuidSchema } from '~/schemas';

const validateData = <T>(data: unknown, schema: ZodSchema<T>) => {
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		throw ApiError.zod(parsed.error);
	}

	return parsed.data;
};

const validateUuid = (id: unknown) => validateData(id, uuidSchema);

const validateUpdateUserData = (data: unknown) =>
	validateData(data, updateUserSchema);

export const validationService = {
	validateUuid,
	validateUpdateUserData,
};
