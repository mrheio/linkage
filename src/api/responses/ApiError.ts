import { ZodError } from 'zod';
import { HTTP_STATUS_CODE } from '../status-codes';
import ApiResponse from './ApiResponse';

export default class ApiError extends ApiResponse {
	details: unknown;

	constructor(
		message: string,
		init?: { status?: number; details?: unknown },
	) {
		super('error', message, init?.status ?? HTTP_STATUS_CODE.BAD_REQUEST);
		this.details = init?.details ?? null;
	}

	static returnOrThrow(e: unknown) {
		if (e instanceof ApiError) {
			return e;
		}
		throw e;
	}

	static zod(validationError: ZodError) {
		return new ApiError('Provided data has invalid format', {
			details: validationError.flatten(),
		});
	}

	static unauthorized() {
		return new ApiError('Request is unauthorized', {
			status: HTTP_STATUS_CODE.UNAUTHORIZED,
		});
	}

	static emailTaken() {
		return new ApiError('This email is taken');
	}

	static usernameTaken() {
		return new ApiError('This username is taken');
	}

	static invalidJwt() {
		return new ApiError('Provided JWT has invalid format');
	}

	static expiredJwt() {
		return new ApiError('Provided JWT is expired', {
			status: HTTP_STATUS_CODE.UNAUTHORIZED,
		});
	}

	static userAlreadyInCommunity() {
		return new ApiError('User is already part of this community');
	}

	static notFound(details?: unknown) {
		return {
			user: new ApiError(
				'User not found. Maybe you mistyped something?',
				{
					status: HTTP_STATUS_CODE.NOT_FOUND,
					details,
				},
			),
			generic: new ApiError('Resource not found', {
				status: HTTP_STATUS_CODE.NOT_FOUND,
				details,
			}),
		};
	}

	static communityNameTaken() {
		return new ApiError('This community name is taken');
	}
}
