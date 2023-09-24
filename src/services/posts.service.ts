import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, posts } from '~/drizzle';
import { getSlug } from '~/utils';
import { validationService } from './validation.service';

const getPosts = async () => {
	const result = await db.select().from(posts);
	return result;
};

const getPost = async (pid: number) => {
	const postId = validationService.validatePositiveNumber(pid);

	const result = await db.select().from(posts).where(eq(posts.id, postId));

	if (!result.length) {
		throw ApiError.postNotFound();
	}

	return result[0];
};

const addPost = async (data: unknown) => {
	const postData = validationService.validateAddPostData(data);

	await db
		.insert(posts)
		.values({ ...postData, slug: getSlug(postData.title) });

	return;
};

const updatePost = async (pid: number, data: unknown) => {
	const postId = validationService.validatePositiveNumber(pid);
	let postData = validationService.validateUpdatePostData(data);

	if (postData.title) {
		postData = { ...postData, slug: getSlug(postData.title) };
	}

	const res = await db
		.update(posts)
		.set(postData)
		.where(eq(posts.id, postId));

	if (!res.rowCount) {
		throw ApiError.postNotFound();
	}
};

const deletePost = async (pid: number) => {
	const postId = validationService.validatePositiveNumber(pid);

	await db.delete(posts).where(eq(posts.id, postId));
};

export const postsService = {
	getPosts,
	getPost,
	addPost,
	updatePost,
	deletePost,
};
