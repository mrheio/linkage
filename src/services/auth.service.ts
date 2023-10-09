import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, users } from '~/drizzle';
import { Session } from '~/types';
import { Config } from '../../config';
import { jwtService } from './jwt.service';
import { securityService } from './security.service';
import { validationService } from './validation.service';

const accessTokenOptions = {
	expirationTime: '1m',
	secret: Config.JWT_SECRET(),
};
const refreshTokenOptions = {
	expirationTime: '30d',
	secret: Config.JWT_SECRET(),
};

const generateTokens = async (user: any) => {
	const accessToken = await jwtService.signJwt(
		{ id: user.id, username: user.username, role: user.role },
		accessTokenOptions,
	);
	const refreshToken = await jwtService.signJwt(
		{ id: user.id },
		refreshTokenOptions,
	);
	return { accessToken, refreshToken };
};

const signUp = async (data: unknown) => {
	const signUpData = validationService.validateSignUpData(data);

	try {
		const secureData = securityService.getSecuredUserData(signUpData);
		const user = (await db.insert(users).values(secureData).returning())[0];
		return generateTokens(user);
	} catch (e) {
		// TODO: refactor the way sql errors are handled
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
	const signInData = validationService.validateSignInData(data);

	const result = await db
		.select()
		.from(users)
		.where(eq(users.username, signInData.username));

	if (!result.length) {
		throw ApiError.notFound().user;
	}

	const user = result[0];

	if (!!user.deleted_at) {
		throw ApiError.notFound().user;
	}

	const doPasswordsMatch = securityService.comparePasswords(
		signInData.password,
		user.password ?? '',
	);

	if (!doPasswordsMatch) {
		throw ApiError.notFound().user;
	}

	return generateTokens(user);
};

const refreshSession = async (data: unknown) => {
	const refreshData = validationService.validateRefreshData(data);

	const payload = jwtService.decodeJwt(refreshData.refresh_token) as Session;
	const result = await db
		.select({ id: users.id, username: users.username, role: users.role })
		.from(users)
		.where(eq(users.id, payload.id));

	if (!result.length) {
		throw ApiError.notFound().generic;
	}

	const user = result[0];
	return generateTokens(user);
};

const getSession = async (accessToken: string) => {
	const jwt = await jwtService.verifyJwt(accessToken, Config.JWT_SECRET());
	const sessionData = validationService.validateSessionData(jwt.payload);
	return sessionData;
};

export const authService = {
	signUp,
	signIn,
	refreshSession,
	getSession,
};
