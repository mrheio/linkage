import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '~/services/jwt.service';
import { CookieKey } from '~/utils';
import { ApiError } from './responses';

export const withAuth = (
	handler: (request: NextRequest) => NextResponse | Promise<NextResponse>,
) => {
	return async (request: NextRequest) => {
		try {
			const accessToken = request.cookies.get(CookieKey.AccessToken)
				?.value;

			if (!accessToken) {
				throw ApiError.unauthorized();
			}

			const isJwtExpired = jwtService.isJwtExpired(accessToken);

			if (isJwtExpired) {
				throw ApiError.unauthorized();
			}

			return handler(request);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};
