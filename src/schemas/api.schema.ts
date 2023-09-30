import { ZodSchema, z } from 'zod';

const apiManySchema = <T extends ZodSchema>(schema: T) =>
	z.object({
		items: z.array(schema),
	});

export const apiSuccessSchema = <T extends ZodSchema>(
	schema: T,
	{ many } = { many: false },
) =>
	z.object({
		type: z.literal('success'),
		message: z.string(),
		payload: many ? apiManySchema(schema) : schema,
	});

export const apiErrorSchema = z.object({
	type: z.literal('error'),
	message: z.string(),
	details: z.any().nullable(),
});
