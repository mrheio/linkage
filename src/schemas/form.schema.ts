import { z } from 'zod';

export const signUpSchema = z.object({
	email: z.string().email(),
	username: z.string().trim().min(3),
	password: z.string().trim().min(8),
});

export type SignUpData = z.infer<typeof signUpSchema>;
