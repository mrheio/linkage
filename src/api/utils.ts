import { NextRequest, NextResponse } from 'next/server';
import { authService } from '~/services';
import { jwtService } from '~/services/jwt.service';
import { ApiError } from './responses';

const getBearerToken = (request: NextRequest) => {
	const authorization = request.headers.get('Authorization');

	if (!authorization) {
		return null;
	}

	const token = authorization.replace(/^Bearer\s+/, '');
	return token;
};

export const withAuth = (
	handler: (
		request: NextRequest,
		context: any,
	) => NextResponse | Promise<NextResponse> | Response | Promise<Response>,
) => {
	return async (request: NextRequest, context: any) => {
		try {
			const token = getBearerToken(request);

			if (!token) {
				throw ApiError.unauthorized();
			}

			const isJwtExpired = jwtService.isJwtExpired(token);

			if (isJwtExpired) {
				throw ApiError.unauthorized();
			}

			return handler(request, context);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};

export const withAdmin = (
	handler: (
		request: NextRequest,
		context: any,
	) => NextResponse | Promise<NextResponse> | Response | Promise<Response>,
) => {
	return async (request: NextRequest, context: any) => {
		try {
			const token = getBearerToken(request);

			if (!token) {
				throw ApiError.unauthorized();
			}

			const session = await authService.getSession(token);

			if (session.role !== 'admin') {
				throw ApiError.unauthorized();
			}

			return handler(request, context);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};

export const withOwner = (
	handler: (
		request: NextRequest,
		context: any,
	) => NextResponse | Promise<NextResponse> | Response | Promise<Response>,
) => {
	return async (request: NextRequest, context: any) => {
		try {
			const token = getBearerToken(request);

			if (!token) {
				throw ApiError.unauthorized();
			}

			const session = await authService.getSession(token);

			if (session.id !== context.params.uid) {
				throw ApiError.unauthorized();
			}

			return handler(request, context);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};

export const withAdminOrOwner = (
	handler: (
		request: NextRequest,
		context: any,
	) => NextResponse | Promise<NextResponse> | Response | Promise<Response>,
) => {
	return async (request: NextRequest, context: any) => {
		try {
			const token = getBearerToken(request);

			if (!token) {
				throw ApiError.unauthorized();
			}

			const session = await authService.getSession(token);

			if (session.role !== 'admin' && session.id !== context.params.uid) {
				throw ApiError.unauthorized();
			}

			return handler(request, context);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};
