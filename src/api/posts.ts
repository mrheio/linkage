import { NextRequest } from 'next/server';
import { postsService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

const getPosts = async (request: NextRequest) => {
	try {
		const res = await postsService.getPosts();
		return ApiSuccess.getMany(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const getPost = async (
	request: NextRequest,
	context: { params: { pid: string } },
) => {
	const { pid } = context.params;

	try {
		const res = await postsService.getPost(pid);
		return ApiSuccess.getOne(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const postPost = async (
	request: NextRequest,
	context: { params: { uid: string; cid: string } },
) => {
	const { uid, cid } = context.params;
	const data = await request.json();

	try {
		await postsService.createPost({
			...data,
			created_by_id: uid,
			community_id: cid,
		});
		return ApiSuccess.created().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const patchPost = async (
	request: NextRequest,
	context: { params: { pid: string } },
) => {
	const { pid } = context.params;
	const data = await request.json();

	try {
		await postsService.updatePost(pid, data);
		return ApiSuccess.updated().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const deletePost = async (
	request: NextRequest,
	context: { params: { pid: string } },
) => {
	const { pid } = context.params;

	try {
		await postsService.deletePost(pid);
		return ApiSuccess.deleted().toNoContentResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

export const postsAPI = {
	POST: postPost,
	GET: { ONE: getPost, MANY: getPosts },
	PATCH: patchPost,
	DELETE: deletePost,
};
