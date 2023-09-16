import { Community } from '~/drizzle';
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

	static getUsers(users: any[]) {
		return new ApiSuccess('Users returned', { payload: { items: users } });
	}

	static updateUser() {
		return new ApiSuccess('User data updated');
	}

	static deleteUser() {
		return new ApiSuccess('User deleted', {
			status: HTTP_STATUS_CODE.NO_CONTENT,
		});
	}

	static getUserCommunities(communities: Community[]) {
		return new ApiSuccess('User communities returned', {
			payload: { items: communities },
		});
	}
}
