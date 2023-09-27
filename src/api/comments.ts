import { NextRequest } from 'next/server';
import { commentsService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

const getComments = async (
	request: NextRequest,
	context: { params: { pid: string } },
) => {
	const { pid } = context.params;

	try {
		const res = await commentsService.getComments(pid);
		return ApiSuccess.getMany(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const postComment = async (
	request: NextRequest,
	context: {
		params: { pid: string; uid: string };
	},
) => {
	const { pid, uid } = context.params;
	const data = await request.json();

	try {
		const res = await commentsService.createComment({
			...data,
			post_id: pid,
			created_by_id: uid,
		});
		return ApiSuccess.created(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const patchComment = async (
	request: NextRequest,
	context: { params: { commId: string } },
) => {
	const { commId } = context.params;
	const data = await request.json();

	try {
		const res = await commentsService.updateComment(commId, data);
		return ApiSuccess.updated(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const deleteComment = async (
	request: NextRequest,
	context: { params: { commId: string } },
) => {
	const { commId } = context.params;

	try {
		await commentsService.deleteComment(commId);
		return ApiSuccess.deleted().toNoContentResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const commentsAPI = {
	GET: { MANY: getComments },
	POST: postComment,
	PATCH: patchComment,
	DELETE: deleteComment,
};
