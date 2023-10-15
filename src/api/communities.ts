import { NextRequest } from 'next/server';
import { communitiesService } from '~/services';
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

const getUserCommunities = async (
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

const postCommunity = async (
	request: NextRequest,
	context: { params: { uid: string } },
) => {
	const { uid } = context.params;
	const data = await request.json();

	try {
		await communitiesService.createCommunity({ ...data, owner_id: uid });
		return ApiSuccess.created().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const patchCommunity = async (
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

const deleteCommunity = async (
	request: NextRequest,
	context: { params: { cid: string } },
) => {
	const { cid } = context.params;

	try {
		await communitiesService.deleteCommunity(cid);
		return ApiSuccess.deleted().toNoContentResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const communitiesAPI = {
	POST: postCommunity,
	GET: { MANY: getCommunities, ONE: getCommunity, USER: getUserCommunities },
	PATCH: patchCommunity,
	DELETE: deleteCommunity,
};
