import { z } from 'zod';
import {
	apiErrorSchema,
	apiGetManySuccessSchema,
	apiSuccessSchema,
} from '~/schemas';

export type ApiSuccessSchema<T> = z.infer<
	ReturnType<typeof apiSuccessSchema<T>>
>;
export type ApiGetManySuccessSchema<T> = z.infer<
	ReturnType<typeof apiGetManySuccessSchema<T>>
>;
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;
