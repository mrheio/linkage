import { z } from 'zod';

export const generateTokensSchema = z.object({
	id: z.string().uuid(),
	username: z.string(),
	role: z.enum(['user', 'admin']),
});

export const signUpSchema = z.object({
	email: z.string().email(),
	username: z.string().trim().min(3),
	password: z.string().trim().min(8),
});

export const signInSchema = z.object({
	username: z.string().trim().min(3),
	password: z.string().trim().min(8),
});

export const refreshSessionSchema = z.object({
	refresh_token: z.string(),
});
