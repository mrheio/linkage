import { z } from 'zod';
import { userSchema } from './user.schema';

export const communitySchema = z.object({
	id: z.number().min(0),
	name: z.string(),
	description: z.string().nullable(),
	slug: z.string(),
	created_at: z.number().positive(),
	updated_at: z.number().positive(),
	deleted_at: z.number().positive().nullable(),
	owner_id: z.string().uuid(),
	created_by_id: z.string().uuid(),
});

export const communityWithMembersSchema = communitySchema.extend({
	members: z.array(userSchema),
});

export const addCommunitySchema = z.object({
	name: z.string().trim().min(3),
	description: z.string().optional(),
	owner_id: z.string().uuid(),
});

export const updateCommunitySchema = z.object({
	name: z.string().trim().min(3).optional(),
	description: z.string().optional(),
	slug: z.string().trim().min(3).optional(),
	owner_id: z.string().uuid().optional(),
});
