import { z } from 'zod';
import { userSchema } from './user.schema';

export const communitySchema = z.object({
	id: z.number().min(0),
	name: z.string(),
	description: z.string(),
	slug: z.string(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	deleted_at: z.string().datetime().nullable(),
	owner_id: z.string().uuid(),
	created_by_id: z.string().uuid(),
});

export const communityWithMembersSchema = communitySchema.extend({
	members: z.array(userSchema),
});
