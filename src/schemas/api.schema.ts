import { ZodSchema, z } from 'zod';

const apiManySchema = <T extends ZodSchema>(schema: T) =>
	z.object({
		items: z.array(schema),
	});

export const apiSuccessSchema = <T>(schema: ZodSchema<T>) =>
	z.object({
		type: z.literal('success'),
		message: z.string(),
		payload: schema,
	});

export const apiGetManySuccessSchema = <T>(schema: ZodSchema<T>) =>
	apiSuccessSchema(schema).extend({
		payload: z.object({ items: z.array(schema) }),
	});

export const apiErrorSchema = z.object({
	type: z.literal('error'),
	message: z.string(),
	details: z.any().nullable(),
});

export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;
