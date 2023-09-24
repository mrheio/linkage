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

	static getCommunities(communities: any[]) {
		return new ApiSuccess('Communities returned', {
			payload: { items: communities },
		});
	}

	static getUserCommunities(communities: Community[]) {
		return new ApiSuccess('Communities returned', {
			payload: { items: communities },
		});
	}

	static addCommunity() {
		return new ApiSuccess('Community added', {
			status: HTTP_STATUS_CODE.CREATED,
		});
	}

	static updateCommunity() {
		return new ApiSuccess('Community updated');
	}

	static addUserToCommunity() {
		return new ApiSuccess('User added to community');
	}

	static deleteUserFromCommunity() {
		return new ApiSuccess('User delete from community', {
			status: HTTP_STATUS_CODE.NO_CONTENT,
		});
	}

	static getPosts(posts) {
		return new ApiSuccess('Posts returned', { payload: { items: posts } });
	}

	static getPost(post) {
		return new ApiSuccess('Post returned', { payload: post });
	}

	static addPost() {
		return new ApiSuccess('Post added', {
			status: HTTP_STATUS_CODE.CREATED,
		});
	}

	static updatePost() {
		return new ApiSuccess('Post updated');
	}

	static deletePost() {
		return new ApiSuccess('', { status: HTTP_STATUS_CODE.NO_CONTENT });
	}
}
