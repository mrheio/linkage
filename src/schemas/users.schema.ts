import { z } from 'zod';

export const deleteUserSchema = z.string().uuid();

type DeleteUserData = z.infer<typeof deleteUserSchema>;
