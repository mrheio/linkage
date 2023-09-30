import { z } from 'zod';

export const userSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	username: z.string(),
	role: z.enum(['user', 'admin']),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	deleted_at: z.string().datetime().nullable(),
});
