import { NextRequest } from 'next/server';
import { communitiesService } from '~/services';
import { ApiError, ApiSuccess } from './responses';
import { withAdminOrOwner } from './utils';

export const getCommunities = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const includeMembers = searchParams.get('includeMembers') === 'true';

	try {
		const communities = await communitiesService.getCommunities({
			includeMembers,
		});
		return ApiSuccess.getCommunities(communities).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const getUserCommunities = async (
	request: NextRequest,
	context: { params: { uid: string } },
) => {
	const { uid } = context.params;
	const { searchParams } = new URL(request.url);
	const reverse = searchParams.get('reverse') === 'true';

	try {
		const communities = await communitiesService.getUserCommunities(uid, {
			reverse,
		});
		return ApiSuccess.getUserCommunities(communities).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const postCommunity = async (request: NextRequest) => {
	const data = await request.json();

	try {
		await communitiesService.addCommunity(data);
		return ApiSuccess.addCommunity().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const patchCommunity = async (
	request: NextRequest,
	context: { params: { cid: number } },
) => {
	const { cid } = context.params;
	const data = await request.json();

	try {
		await communitiesService.updateCommunity(cid, data);
		return ApiSuccess.updateCommunity().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const addUserToCommunity = withAdminOrOwner(
	async (
		request: NextRequest,
		context: { params: { uid: string; cid: number } },
	) => {
		const { uid, cid } = context.params;

		try {
			await communitiesService.addUserToCommunity(uid, cid);
			return ApiSuccess.addUserToCommunity().toNextResponse();
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	},
);

export const deleteUserFromCommunity = withAdminOrOwner(
	async (
		request: NextRequest,
		context: { params: { uid: string; cid: number } },
	) => {
		const { uid, cid } = context.params;

		try {
			await communitiesService.deleteUserFromCommunity(uid, cid);
			return ApiSuccess.deleteUserFromCommunity().toNoContentResponse();
		} catch (e) {
			return ApiError.returnOrThrow(e).toNextResponse();
		}
	},
);
