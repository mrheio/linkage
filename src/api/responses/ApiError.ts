import { ZodError } from 'zod';
import ApiResponse from './ApiResponse';

export default class ApiError extends ApiResponse {
	details: unknown;

	constructor(
		message: string,
		init?: { status?: number; details?: unknown },
	) {
		super(message, init?.status ?? 400);
		this.details = init?.details ?? null;
	}

	static zod(validationError: ZodError) {
		return new ApiError('Provided data has invalid format', {
			details: validationError.flatten(),
		});
	}

	static emailTaken() {
		return new ApiError('This email is taken');
	}

	static usernameTaken() {
		return new ApiError('This username is taken');
	}

	static returnOrThrow(e: unknown) {
		if (e instanceof ApiError) {
			return e;
		}

		throw e;
	}
}
