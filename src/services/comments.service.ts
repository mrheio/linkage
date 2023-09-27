import { eq } from 'drizzle-orm';
import { comments, db } from '~/drizzle';
import { validationService } from './validation.service';

const getComments = async (pid: string | number) => {
	const postId = validationService.validatePositiveNumber(pid);

	const res = await db
		.select()
		.from(comments)
		.where(eq(comments.post_id, postId));

	return res;
};

const createComment = async (data: unknown) => {
	const commentData = validationService.validateCreateCommentData(data);

	const res = await db.insert(comments).values(commentData).returning();

	return res[0];
};

const updateComment = async (commId: string | number, data: unknown) => {
	const commentId = validationService.validatePositiveNumber(commId);
	const updateData = validationService.validateUpdateCommentData(data);

	const res = await db
		.update(comments)
		.set(updateData)
		.where(eq(comments.id, commentId))
		.returning();

	return res[0];
};

const deleteComment = async (commId: string | number) => {
	const commentId = validationService.validatePositiveNumber(commId);

	await db.delete(comments).where(eq(comments.id, commentId));

	return;
};

export const commentsService = {
	getComments,
	createComment,
	updateComment,
	deleteComment,
};
