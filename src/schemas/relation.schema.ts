import { z } from 'zod';

export const usersToCommunitiesSchema = z.object({
	user_id: z.string().uuid(),
	community_id: z.number().positive(),
});
