import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import { signUpSchema } from '~/schemas';
import { securityService } from './security.service';

const signUp = async (data: unknown) => {
	const parsed = signUpSchema.safeParse(data);

	if (!parsed.success) {
		throw ApiError.zod(parsed.error);
	}

	try {
		const secureData = securityService.hashUserPassword(parsed.data);
		const user = (await db.insert(users).values(secureData).returning())[0];
		return user.id;
	} catch (e) {
		if ((e as any)?.constraint === 'users_email_unique') {
			throw ApiError.emailTaken();
		}

		if ((e as any)?.constraint === 'users_username_unique') {
			throw ApiError.usernameTaken();
		}

		throw e;
	}
};

export const authService = {
	signUp,
};
