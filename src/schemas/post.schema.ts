import { z } from 'zod';

export const postSchema = z.object({
	id: z.number().positive(),
	title: z.string(),
	content: z.string(),
	slug: z.string(),
	upvotes: z.number().positive(),
	downvotes: z.number().positive(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	deleted_at: z.string().datetime().nullable(),
	created_by_id: z.string().uuid(),
	community_id: z.number().positive(),
});
