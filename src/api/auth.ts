import { NextRequest } from 'next/server';
import { authService } from '~/services';
import { CookieKey, secureCookieOptions } from '~/utils';
import { ApiError, ApiSuccess } from './responses';

export const signUp = async (request: Request) => {
	const data = await request.json();

	try {
		const tokens = await authService.signUp(data);
		const response = ApiSuccess.signUp(tokens).toNextResponse();

		response.cookies.set(
			CookieKey.AccessToken,
			tokens.accessToken,
			secureCookieOptions,
		);
		response.cookies.set(
			CookieKey.RefreshToken,
			tokens.refreshToken,
			secureCookieOptions,
		);

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

		response.cookies.set(
			CookieKey.AccessToken,
			tokens.accessToken,
			secureCookieOptions,
		);
		response.cookies.set(
			CookieKey.RefreshToken,
			tokens.refreshToken,
			secureCookieOptions,
		);

		return response;
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const signOut = async (request: Request) => {
	const response = ApiSuccess.signOut().toNextResponse();

	response.cookies.set(CookieKey.AccessToken, '', secureCookieOptions);
	response.cookies.set(CookieKey.RefreshToken, '', secureCookieOptions);
	response.cookies.delete(CookieKey.AccessToken);
	response.cookies.delete(CookieKey.RefreshToken);

	return response;
};

export const refreshSession = async (request: NextRequest) => {
	const contentType = request.headers.get('Content-Type');
	let data = request.cookies.get(CookieKey.RefreshToken)?.value;

	if (contentType === 'application/json') {
		data = await request.json();
	}

	try {
		const tokens = await authService.refreshSession(
			typeof data === 'object' ? data : { refresh_token: data },
		);
		const response = ApiSuccess.refreshSession(tokens).toNextResponse();

		response.cookies.set(
			CookieKey.AccessToken,
			tokens.accessToken,
			secureCookieOptions,
		);
		response.cookies.set(
			CookieKey.RefreshToken,
			tokens.refreshToken,
			secureCookieOptions,
		);

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

	try {
		const session = await authService.getSession(accessToken);
		return ApiSuccess.getSession(session).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};
