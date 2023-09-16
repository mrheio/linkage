import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import {
	removeSensitiveUserData,
	removeSensitiveUserDataFromList,
} from '~/utils';
import { validationService } from './validation.service';

const getUsers = async () => {
	const result = await db.select().from(users);
	return removeSensitiveUserDataFromList(result);
};

const getUser = async (uid: string) => {
	const result = await db.select().from(users).where(eq(users.id, uid));

	if (!result.length) {
		throw ApiError.userNotFound();
	}

	const user = result[0];
	return removeSensitiveUserData(user);
};

const updateUser = async (uid: string, data: unknown) => {
	const userId = validationService.validateUuid(uid);
	const userData = validationService.validateUpdateUserData(data);

	await db.update(users).set(userData).where(eq(users.id, userId));

	return;
};

const deleteUser = async (uid: string) => {
	const userId = validationService.validateUuid(uid);

	const result = await db.delete(users).where(eq(users.id, userId));

	if (!result.rowCount) {
		throw ApiError.userNotFound();
	}

	return;
};

export const usersService = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
