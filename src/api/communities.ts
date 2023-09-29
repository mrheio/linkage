import { NextRequest } from 'next/server';
import { communitiesService } from '~/services';
import { withAuth } from './guards';
import { ApiError, ApiSuccess } from './responses';

const getCommunities = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const includeMembers = searchParams.get('includeMembers') === 'true';

	try {
		const communities = await communitiesService.getCommunities({
			includeMembers,
		});
		return ApiSuccess.getMany(communities).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const getCommunity = async (
	request: NextRequest,
	context: { params: { cid: string } },
) => {
	const { cid } = context.params;
	const { searchParams } = new URL(request.url);
	const includeMembers = searchParams.get('includeMembers') === 'true';

	try {
		const community = await communitiesService.getCommunity(cid, {
			includeMembers,
		});
		return ApiSuccess.getOne(community).toNextResponse();
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
		return ApiSuccess.getMany(communities).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const postCommunity = async (request: NextRequest) => {
	const data = await request.json();

	try {
		await communitiesService.createCommunity(data);
		return ApiSuccess.created().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const patchCommunity = async (
	request: NextRequest,
	context: { params: { cid: string } },
) => {
	const { cid } = context.params;
	const data = await request.json();

	try {
		await communitiesService.updateCommunity(cid, data);
		return ApiSuccess.updated().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const communitiesAPI = {
	POST: withAuth(postCommunity),
	GET: { MANY: getCommunities, ONE: getCommunity, USER: getUserCommunities },
	PATCH: patchCommunity,
};
