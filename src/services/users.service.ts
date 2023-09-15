import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import { deleteUserSchema } from '~/schemas';
import {
	removeSensitiveUserData,
	removeSensitiveUserDataFromList,
} from '~/utils/api';

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

const deleteUser = async (uid: string) => {
	const parsed = deleteUserSchema.safeParse(uid);

	if (!parsed.success) {
		throw ApiError.userNotFound();
	}

	const result = await db.delete(users).where(eq(users.id, parsed.data));

	if (!result.rowCount) {
		throw ApiError.userNotFound();
	}

	return;
};

export const usersService = {
	getUsers,
	getUser,
	deleteUser,
};
