import { eq } from 'drizzle-orm';
import { communities, db, usersToCommunities } from '~/drizzle';
import { validationService } from './validation.service';

const getUserCommunities = async (uid: string) => {
	const userId = validationService.validateUuid(uid);

	const result = await db
		.select()
		.from(usersToCommunities)
		.where(eq(usersToCommunities.user_id, userId))
		.innerJoin(
			communities,
			eq(usersToCommunities.community_id, communities.id),
		);

	return result.map((x) => x.communities);
};

export const communitiesService = {
	getUserCommunities,
};
