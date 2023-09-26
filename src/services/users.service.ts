import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import {
	removeSensitiveUserData,
	removeSensitiveUserDataFromList,
} from '~/utils';
import { validationService } from './validation.service';

const getUsers = async () => {
	const res = await db.select().from(users);
	return removeSensitiveUserDataFromList(res);
};

const getUser = async (uid: string) => {
	const res = await db.select().from(users).where(eq(users.id, uid));

	if (!res.length) {
		throw ApiError.notFound();
	}

	const user = res[0];
	return removeSensitiveUserData(user);
};

const updateUser = async (uid: string, data: unknown) => {
	const userId = validationService.validateUuid(uid);
	const userData = validationService.validateUpdateUserData(data);

	const res = await db
		.update(users)
		.set(userData)
		.where(eq(users.id, userId))
		.returning();

	return res[0];
};

const deleteUser = async (uid: string) => {
	const userId = validationService.validateUuid(uid);

	const result = await db.delete(users).where(eq(users.id, userId));

	if (!result.rowCount) {
		throw ApiError.notFound();
	}

	return;
};

export const usersService = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
