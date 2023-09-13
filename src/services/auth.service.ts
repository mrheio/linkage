import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import {
	Session,
	refreshSessionSchema,
	signInSchema,
	signUpSchema,
} from '~/schemas';
import { Config } from '../../config';
import { jwtService } from './jwt.service';
import { securityService } from './security.service';

const signUp = async (data: unknown) => {
	const parsed = signUpSchema.safeParse(data);

	if (!parsed.success) {
		throw ApiError.zod(parsed.error);
	}

	try {
		const secureData = securityService.hashUserPassword(parsed.data);
		const user = (await db.insert(users).values(secureData).returning())[0];

		const accessToken = await jwtService.signJwt(
			{ id: user.id, username: user.username },
			{ expirationTime: '30s', secret: Config.JWT_SECRET },
		);
		const refreshToken = await jwtService.signJwt(
			{ id: user.id },
			{ expirationTime: '30d', secret: Config.JWT_SECRET },
		);

		return { accessToken, refreshToken };
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

const signIn = async (data: unknown) => {
	const parsed = signInSchema.safeParse(data);

	if (!parsed.success) {
		throw ApiError.zod(parsed.error);
	}

	const result = await db
		.select()
		.from(users)
		.where(eq(users.username, parsed.data.username));

	if (!result.length) {
		throw ApiError.userNotFound();
	}

	const user = result[0];
	const doPasswordsMatch = securityService.comparePasswords(
		parsed.data.password,
		user.password ?? '',
	);

	if (!doPasswordsMatch) {
		throw ApiError.userNotFound();
	}

	const accessToken = await jwtService.signJwt(
		{ id: user.id, username: user.username },
		{ expirationTime: '30s', secret: Config.JWT_SECRET },
	);
	const refreshToken = await jwtService.signJwt(
		{ id: user.id },
		{ expirationTime: '30d', secret: Config.JWT_SECRET },
	);

	return { accessToken, refreshToken };
};

const refreshSession = async (data: unknown) => {
	const parsed = refreshSessionSchema.safeParse(data);

	if (!parsed.success) {
		throw ApiError.zod(parsed.error);
	}

	const payload = jwtService.decodeJwt(parsed.data.refresh_token) as Session;

	const result = await db
		.select({ id: users.id, username: users.username })
		.from(users)
		.where(eq(users.id, payload.id));

	if (!result.length) {
		throw ApiError.userNotFound();
	}

	const user = result[0];

	const newAccessToken = await jwtService.signJwt(
		{ id: user.id, username: user.username },
		{ expirationTime: '30s', secret: Config.JWT_SECRET },
	);
	const newRefreshToken = await jwtService.signJwt(
		{ id: user.id },
		{ expirationTime: '30d', secret: Config.JWT_SECRET },
	);

	return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const authService = {
	signUp,
	signIn,
	refreshSession,
};
