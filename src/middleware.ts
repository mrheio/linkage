import { NextRequest, NextResponse } from 'next/server';
import { Config } from '../config';
import { ROUTES, isAuthRoute, isProtectedRoute } from './router';
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

	return nextResponse;
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

	console.log('Session middleware');

	const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;
	const refreshToken = request.cookies.get(CookieKey.RefreshToken)?.value;

	if (!accessToken || !refreshToken) {
		console.log('No session. Continue');
		return;
	}

	const isSessionExpired = jwtService.isJwtExpired(accessToken);

	if (isSessionExpired) {
		console.error('Session expired. Try refresh');

		const refresh = await fetch(`${Config.API_URL}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (!refresh.ok) {
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
		console.log('No session available. Redirecting to Sign In');
		return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
	}

	if (accessToken && isAuthRoute(route)) {
		console.log('Session available. Redirecting to Home');
		return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
	}

	return;
};

export const middleware = async (request: NextRequest) => {
	const response = NextResponse.next();

	const nextResponse = withMiddleware(request, response, [
		logMiddleware,
		sessionMiddleware,
		authMiddleware,
	]);

	return nextResponse;
};

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
