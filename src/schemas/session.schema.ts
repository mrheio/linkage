import { z } from 'zod';

export const sessionSchema = z.object({
	iss: z.string().optional(),
	sub: z.string().optional(),
	exp: z.number().optional(),
	iat: z.number().optional(),
	id: z.string(),
	username: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;
