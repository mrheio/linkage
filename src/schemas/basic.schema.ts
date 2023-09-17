import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export const positiveNumberSchema = z.number().nonnegative();
