import { z } from 'zod';

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

export const updateUserSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().trim().min(3).optional(),
	password: z.string().trim().min(8).optional(),
	role: z.enum(['user', 'admin']).optional(),
	updated_at: z.string().datetime().optional(),
	deleted_at: z.string().datetime().nullable().optional(),
});

export const deleteUserSchema = z.string().uuid();

export const addCommunitySchema = z.object({
	name: z.string().trim().min(3),
	description: z.string().optional(),
	owner_id: z.string().uuid(),
});

export const updateCommunitySchema = z.object({
	name: z.string().trim().min(3).optional(),
	description: z.string().optional(),
	owner_id: z.string().uuid().optional(),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type RefreshSessionData = z.infer<typeof refreshSessionSchema>;

export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type DeleteUserData = z.infer<typeof deleteUserSchema>;

export type AddCommunityData = z.infer<typeof addCommunitySchema>;
export type UpdateCommunityData = z.infer<typeof updateCommunitySchema>;
