import { NextRequest } from 'next/server';
import { relationsService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

const addUserToCommunity = async (
	request: NextRequest,
	context: { params: { uid: string; cid: string } },
) => {
	const { uid, cid } = context.params;

	try {
		await relationsService.addUserToCommunity(uid, cid);
		return ApiSuccess.updated().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const deleteUserFromCommunity = async (
	request: NextRequest,
	context: { params: { uid: string; cid: string } },
) => {
	const { uid, cid } = context.params;

	try {
		await relationsService.deleteUserFromCommunity(uid, cid);
		return ApiSuccess.updated().toNoContentResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const relationsAPI = {
	USER_COMMUNITY: {
		POST: addUserToCommunity,
		DELETE: deleteUserFromCommunity,
	},
};
