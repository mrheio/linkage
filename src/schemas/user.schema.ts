import { z } from 'zod';

export const userSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	username: z.string(),
	role: z.enum(['user', 'admin']),
	created_at: z.number().positive(),
	updated_at: z.number().positive(),
	deleted_at: z.number().positive().nullable(),
});

export const updateUserSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().trim().min(3).optional(),
	password: z.string().trim().min(8).optional(),
	role: z.enum(['user', 'admin']).optional(),
	updated_at: z.string().datetime().optional(),
	deleted_at: z.string().datetime().nullable().optional(),
});

export const deleteUserSchema = z.string().uuid();
