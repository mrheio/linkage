import { NextRequest } from 'next/server';
import { postsService } from '~/services';
import { ApiError, ApiSuccess } from './responses';

const getPosts = async (request: NextRequest) => {
	try {
		const res = await postsService.getPosts();
		return ApiSuccess.getPosts(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const getPost = async (request: NextRequest, context) => {
	const { pid } = context.params;

	try {
		const res = await postsService.getPost(pid);
		return ApiSuccess.getPost(res).toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const postPost = async (request: NextRequest, context) => {
	const { uid, cid } = context.params;
	const data = await request.json();

	try {
		await postsService.addPost({
			...data,
			created_by_id: uid,
			community_id: cid,
		});
		return ApiSuccess.addPost().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const patchPost = async (request: NextRequest, context) => {
	const { pid } = context.params;
	const data = await request.json();

	try {
		await postsService.updatePost(pid, data);
		return ApiSuccess.updatePost().toNextResponse();
	} catch (e) {
		return ApiError.returnOrThrow(e).toNextResponse();
	}
};

const deletePost = async (request: NextRequest, context) => {
	const { pid } = context.params;

	try {
		await postsService.deletePost(pid);
		return ApiSuccess.deletePost().toNoContentResponse();
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
