import { NextRequest, NextResponse } from 'next/server';
import { Config } from '../config';
import { HTTP_STATUS_CODE } from './api/status-codes';
import { ROUTES, isAdminRoute, isAuthRoute, isProtectedRoute } from './router';
import { authService, usersService } from './services';
import { jwtService } from './services/jwt.service';
import { CookieKey } from './utils';

const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const cyan = '\x1b[36m';

const methodColorMapper = {
	POST: green,
	GET: cyan,
	PATCH: yellow,
	DELETE: red,
};

const log = (request: NextRequest) => {
	const date = new Date(Date.now()).toLocaleString('en-GB');
	let method = request.method;
	method = `${(methodColorMapper as any)[method]}${method}\x1b[0m`;
	const url = request.url;

	console.log(
		`\x1b[37m${date}\x1b[0m - \x1b[1m${method}\x1b[22m - \x1b[1m${url}\x1b[22m`,
	);
};

const withMiddleware = async (
	request: NextRequest,
	response: NextResponse,
	middlewares: ((
		request: NextRequest,
		response: NextResponse,
	) => NextResponse | void | Promise<NextResponse | void>)[],
) => {
	let nextResponse = null;

	for (const middleware of middlewares) {
		nextResponse = (await middleware(request, response)) ?? null;

		if (nextResponse) {
			return nextResponse;
		}
	}

	return response;
};

const logMiddleware = (request: NextRequest, response: NextResponse) => {
	log(request);
	return;
};

const sessionMiddleware = async (
	request: NextRequest,
	response: NextResponse,
) => {
	const isApi = request.nextUrl.pathname.includes('api');

	if (isApi) {
		return;
	}

	const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;
	const refreshToken = request.cookies.get(CookieKey.RefreshToken)?.value;

	if (!accessToken || !refreshToken) {
		return;
	}

	const isSessionExpired = jwtService.isJwtExpired(accessToken);

	if (isSessionExpired) {
		const refresh = await fetch(`${Config.API_URL()}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (!refresh.ok) {
			// TODO: better not found case handling
			if (refresh.status === HTTP_STATUS_CODE.NOT_FOUND) {
				const retry = NextResponse.redirect(new URL(request.url));

				retry.cookies.delete(CookieKey.AccessToken);
				retry.cookies.delete(CookieKey.RefreshToken);

				return retry;
			}

			console.error('There was a problem when refreshing tokens');
			return response;
		}

		const tokens = (await refresh.json()).payload;

		const retry = NextResponse.redirect(new URL(request.url));

		retry.cookies.set(CookieKey.AccessToken, tokens.access_token);
		retry.cookies.set(CookieKey.RefreshToken, tokens.refresh_token);

		return retry;
	}

	return;
};

const authMiddleware = (request: NextRequest, response: NextResponse) => {
	const isApi = request.nextUrl.pathname.includes('api');

	if (isApi) {
		return;
	}

	const route = request.nextUrl.pathname;
	const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;

	if (!accessToken && isProtectedRoute(route)) {
		return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
	}

	if (accessToken && isAuthRoute(route)) {
		return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
	}

	return;
};

const adminMiddleware = async (
	request: NextRequest,
	response: NextResponse,
) => {
	const isApi = request.nextUrl.pathname.includes('api');

	if (isApi) {
		return;
	}

	const route = request.nextUrl.pathname;
	const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;

	if (!accessToken && isProtectedRoute(route)) {
		return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
	}

	if (accessToken && isAdminRoute(route)) {
		const session = await authService.getSession(accessToken);
		const user = await usersService.getUser(session.id);

		if (user.role !== 'admin') {
			return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
		}
	}

	return;
};

export const middleware = async (request: NextRequest) => {
	const response = NextResponse.next();

	const nextResponse = await withMiddleware(request, response, [
		logMiddleware,
		sessionMiddleware,
		authMiddleware,
		adminMiddleware,
	]);

	nextResponse.headers.set('x-middleware-cache', 'no-cache');

	if (request.cookies.get(CookieKey.AccessToken)?.value) {
		nextResponse.headers.set(
			'Authorization',
			`Bearer ${request.cookies.get(CookieKey.AccessToken)?.value}`,
		);
	}

	return nextResponse;
};

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
