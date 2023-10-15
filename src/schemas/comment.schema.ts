import { z } from 'zod';

export const commentSchema = z.object({
	id: z.number().positive(),
	content: z.string(),
	upvotes: z.number().positive(),
	downvotes: z.number().positive(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
	deleted_at: z.coerce.date().nullable(),
	post_id: z.number().positive(),
	created_by_id: z.string().uuid(),
	reply_to_id: z.number().positive().nullable(),
});

export const createCommentSchema = z.object({
	content: z.string(),
	post_id: z.number().positive(),
	created_by_id: z.string().uuid(),
	reply_to_id: z.number().positive().optional(),
});

export const updateCommentSchema = z.object({
	content: z.string().optional(),
	upvotes: z.number().positive().optional(),
	downvotes: z.number().positive().optional(),
});
