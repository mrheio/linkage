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

	static getSession(session?: unknown | null) {
		if (!session) {
			return new ApiSuccess('No user session found');
		}
		return new ApiSuccess('User session returned', { payload: session });
	}

	static refreshSession(data: { accessToken: string; refreshToken: string }) {
		return new ApiSuccess('User session refreshed', {
			payload: {
				access_token: data.accessToken,
				refresh_token: data.refreshToken,
			},
		});
	}
}
