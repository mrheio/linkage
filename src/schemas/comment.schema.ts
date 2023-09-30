import { z } from 'zod';

export const commentSchema = z.object({
	id: z.number().positive(),
	content: z.string(),
	upvotes: z.number().positive(),
	downvotes: z.number().positive(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	deleted_at: z.string().datetime().nullable(),
	post_id: z.number().positive(),
	created_by_id: z.string().uuid(),
	reply_to_id: z.number().positive().nullable(),
});
