import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import { datefyData, parseModelDates, removeSensitiveUserData } from '~/utils';
import { validationService } from './validation.service';

const getUsers = async () => {
	const res = await db.select().from(users);
	return res.map((x) => removeSensitiveUserData(parseModelDates(x)));
};

const getUser = async (uid: unknown) => {
	const userId = validationService.validateUuid(uid);

	const res = await db.select().from(users).where(eq(users.id, userId));

	if (!res.length) {
		throw ApiError.notFound().generic;
	}

	const user = res[0];
	return removeSensitiveUserData(parseModelDates(user));
};

const updateUser = async (uid: unknown, data: unknown) => {
	const userId = validationService.validateUuid(uid);
	const userData = validationService.validateUpdateUserData(data);

	const res = await db
		.update(users)
		.set(datefyData(userData))
		.where(eq(users.id, userId))
		.returning();

	return res[0];
};

const deleteUser = async (uid: unknown) => {
	const userId = validationService.validateUuid(uid);

	const result = await db.delete(users).where(eq(users.id, userId));

	if (!result.rowCount) {
		throw ApiError.notFound().generic;
	}

	return;
};

export const usersService = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
