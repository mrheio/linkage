import { NextRequest, NextResponse } from 'next/server';
import { authService, communitiesService, postsService } from '~/services';
import { jwtService } from '~/services/jwt.service';
import { ApiError } from './responses';

// TODO: refactor api guards

type NextApiFn = (
	request: NextRequest,
	context: any,
) => NextResponse | Promise<NextResponse> | Response | Promise<Response>;

const getBearerToken = (request: NextRequest) => {
	const authorization = request.headers.get('Authorization');

	if (!authorization) {
		return null;
	}

	const token = authorization.replace(/^Bearer\s+/, '');
	return token;
};

export const withAuth = (handler: NextApiFn) => {
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

export const withAdmin = (handler: NextApiFn) => {
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

export const withCommunityOwner = (handler: NextApiFn) => {
	return async (request: NextRequest, context: any) => {
		try {
			const token = getBearerToken(request);

			if (!token) {
				throw new Error(
					'withAuth should be called before withCommunityOwner',
				);
			}

			const session = await authService.getSession(token);
			const { cid } = context.params;

			const community = await communitiesService.getCommunity(cid);

			if (community.created_by_id !== session.id) {
				throw ApiError.unauthorized();
			}

			return handler(request, context);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};

export const withPostOwner = (handler: NextApiFn) => {
	return async (request: NextRequest, context: any) => {
		try {
			const token = getBearerToken(request);

			if (!token) {
				throw new Error(
					'withAuth should be called before withPostOwner',
				);
			}

			const session = await authService.getSession(token);
			const { pid } = context.params;

			const post = await postsService.getPost(pid);

			if (post.created_by_id !== session.id) {
				throw ApiError.unauthorized();
			}

			return handler(request, context);
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	};
};
