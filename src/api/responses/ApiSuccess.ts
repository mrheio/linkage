import { Session } from '~/schemas';
import { HTTP_STATUS_CODE } from '../status-codes';
import ApiResponse from './ApiResponse';

export default class ApiSuccess extends ApiResponse {
	payload: unknown;

	constructor(
		message: string,
		init?: { status?: number; payload?: unknown },
	) {
		super('success', message, init?.status ?? HTTP_STATUS_CODE.OK);
		this.payload = init?.payload ?? null;
	}

	toNoContentResponse() {
		if (this.status !== HTTP_STATUS_CODE.NO_CONTENT) {
			throw new Error(
				'Called toNoContentResponse when the status is not 204',
			);
		}

		return new Response(null, { status: this.status });
	}

	static signUp(data: { accessToken: string; refreshToken: string }) {
		return new ApiSuccess('User signed up', {
			status: HTTP_STATUS_CODE.CREATED,
			payload: {
				access_token: data.accessToken,
				refresh_token: data.refreshToken,
			},
		});
	}

	static signIn(data: { accessToken: string; refreshToken: string }) {
		return new ApiSuccess('User signed in', {
			payload: {
				access_token: data.accessToken,
				refresh_token: data.refreshToken,
			},
		});
	}

	static signOut() {
		return new ApiSuccess('User signed out');
	}

	static getSession(session?: Session) {
		if (!session) {
			return new ApiSuccess('No session found');
		}
		return new ApiSuccess('Session returned', { payload: session });
	}

	static refreshSession(data: { accessToken: string; refreshToken: string }) {
		return new ApiSuccess('Session refreshed', {
			payload: {
				access_token: data.accessToken,
				refresh_token: data.refreshToken,
			},
		});
	}

	static getMany(items: unknown[]) {
		return new ApiSuccess('Resources returned', { payload: { items } });
	}

	static getOne(item: unknown) {
		return new ApiSuccess('Resource returned', { payload: item });
	}

	static created(item?: unknown) {
		return new ApiSuccess('Resource created', {
			status: HTTP_STATUS_CODE.CREATED,
			payload: item,
		});
	}

	static updated(item?: unknown) {
		return new ApiSuccess('Rexsource updated', {
			status: HTTP_STATUS_CODE.PARTIAL_CONTENT,
			payload: item,
		});
	}

	static deleted() {
		return new ApiSuccess('Resource deleted', {
			status: HTTP_STATUS_CODE.NO_CONTENT,
		});
	}
}
