import { NextRequest } from 'next/server';
import { authService } from '~/services';
import { jwtService } from '~/services/jwt.service';
import { CookieKey } from '~/utils';
import { Config } from '../../config';
import { ApiError, ApiSuccess } from './responses';

export const signUp = async (request: Request) => {
	const data = await request.json();

	try {
		const tokens = await authService.signUp(data);
		const response = ApiSuccess.signUp(tokens).toNextResponse();

		response.cookies.set(CookieKey.AccessToken, tokens.accessToken);
		response.cookies.set(CookieKey.RefreshToken, tokens.refreshToken);

		return response;
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const signIn = async (request: Request) => {
	const data = await request.json();

	try {
		const tokens = await authService.signIn(data);
		const response = ApiSuccess.signIn(tokens).toNextResponse();

		response.cookies.set(CookieKey.AccessToken, tokens.accessToken);
		response.cookies.set(CookieKey.RefreshToken, tokens.refreshToken);

		return response;
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const signOut = async (request: Request) => {
	const response = ApiSuccess.signOut().toNextResponse();

	response.cookies.set(CookieKey.AccessToken, '');
	response.cookies.set(CookieKey.RefreshToken, '');
	response.cookies.delete(CookieKey.AccessToken);
	response.cookies.delete(CookieKey.RefreshToken);

	return response;
};

export const refreshSession = async (request: NextRequest) => {
	const data = await request.json();

	try {
		const tokens = await authService.refreshSession(data);
		const response = ApiSuccess.refreshSession(tokens).toNextResponse();

		response.cookies.set(CookieKey.AccessToken, tokens.accessToken);
		response.cookies.set(CookieKey.RefreshToken, tokens.refreshToken);

		return response;
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const getSession = async (request: NextRequest) => {
	const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;

	if (!accessToken) {
		return ApiSuccess.getSession().toNextResponse();
	}

	const jwt = await jwtService.verifyJwt(accessToken, Config.JWT_SECRET);
	return ApiSuccess.getSession(jwt.payload).toNextResponse();
};
