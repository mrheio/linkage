import { z } from 'zod';

export const postSchema = z.object({
	id: z.number().positive(),
	title: z.string(),
	content: z.string(),
	slug: z.string(),
	upvotes: z.number().positive(),
	downvotes: z.number().positive(),
	created_at: z.number().positive(),
	updated_at: z.number().positive(),
	deleted_at: z.number().positive().nullable(),
	created_by_id: z.string().uuid(),
	community_id: z.number().positive(),
});

export const addPostSchema = z.object({
	title: z.string().trim().min(3),
	content: z.string().trim().min(1),
	created_by_id: z.string().uuid(),
	community_id: z.number().positive(),
});

export const updatePostSchema = z.object({
	title: z.string().trim().min(3).optional(),
	content: z.string().trim().min(1).optional(),
	slug: z.string().trim().min(3).optional(),
	upvotes: z.number().positive().optional(),
	downvotes: z.number().positive().optional(),
});
