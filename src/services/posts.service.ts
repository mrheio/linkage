import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, posts } from '~/drizzle';
import { getSlug, parseModelDates } from '~/utils';
import { validationService } from './validation.service';

const getPosts = async () => {
	const res = await db.select().from(posts);
	return res.map((x) => parseModelDates(x));
};

const getPost = async (pid: unknown) => {
	const postId = validationService.validatePositiveNumber(pid);

	const res = await db.select().from(posts).where(eq(posts.id, postId));

	if (!res.length) {
		throw ApiError.notFound().generic;
	}

	const post = res[0];
	return parseModelDates(post);
};

const createPost = async (data: unknown) => {
	const postData = validationService.validateAddPostData(data);

	const res = await db
		.insert(posts)
		.values({ ...postData, slug: getSlug(postData.title) })
		.returning();

	return res[0];
};

const updatePost = async (pid: unknown, data: unknown) => {
	const postId = validationService.validatePositiveNumber(pid);
	let postData = validationService.validateUpdatePostData(data);

	if (postData.title) {
		postData = { ...postData, slug: getSlug(postData.title) };
	}

	const res = await db
		.update(posts)
		.set(postData)
		.where(eq(posts.id, postId))
		.returning();

	if (!res.length) {
		throw ApiError.notFound().generic;
	}

	return res[0];
};

const deletePost = async (pid: unknown) => {
	const postId = validationService.validatePositiveNumber(pid);

	await db.delete(posts).where(eq(posts.id, postId));
};

export const postsService = {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
};
