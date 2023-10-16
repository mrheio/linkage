import { eq } from 'drizzle-orm';
import { comments, db } from '~/drizzle';
import { parseModelDates } from '~/utils';
import { validationService } from './validation.service';

const getComments = async (pid: unknown) => {
	const postId = validationService.validatePositiveNumber(pid);

	const res = await db
		.select()
		.from(comments)
		.where(eq(comments.post_id, postId));

	return res.map((x) => parseModelDates(x));
};

const createComment = async (data: unknown) => {
	const commentData = validationService.validateCreateCommentData(data);

	const res = await db.insert(comments).values(commentData).returning();
	const comment = res[0];

	return parseModelDates(comment);
};

const updateComment = async (commId: unknown, data: unknown) => {
	const commentId = validationService.validatePositiveNumber(commId);
	const updateData = validationService.validateUpdateCommentData(data);

	const res = await db
		.update(comments)
		.set(updateData)
		.where(eq(comments.id, commentId))
		.returning();

	return res[0];
};

const deleteComment = async (commId: unknown) => {
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
