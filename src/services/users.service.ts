import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';

const getUser = async (uid: string) => {
	const result = await db.select().from(users).where(eq(users.id, uid));

	if (!result.length) {
		throw ApiError.userNotFound();
	}

	const user = result[0];
	const { password, ...data } = user;

	return data;
};

export const usersService = {
	getUser,
};
