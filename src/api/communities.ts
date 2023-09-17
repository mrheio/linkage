import { NextRequest } from 'next/server';
import { communitiesService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

export const getUserCommunities = async (
	request: NextRequest,
	context: { params: { uid: string } },
) => {
	const { uid } = context.params;

	try {
		const communities = await communitiesService.getUserCommunities(uid);
		return ApiSuccess.getUserCommunities(communities).toNextResponse();
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
