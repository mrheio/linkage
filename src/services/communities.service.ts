import { eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { communities, db, usersToCommunities } from '~/drizzle';
import { UpdateCommunityData } from '~/schemas';
import { getCommunitySlug } from '~/utils';
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

const updateCommunity = async (cid: number, data: unknown) => {
	const communityId = validationService.validatePositiveNumber(cid);
	const communityData = validationService.validateUpdateCommunityData(data);
	let updateData: UpdateCommunityData & { slug?: string } = communityData;

	if (updateData.name) {
		updateData = { ...updateData, slug: getCommunitySlug(updateData.name) };
	}

	const res = await db
		.update(communities)
		.set(updateData)
		.where(eq(communities.id, communityId));

	if (!res.rowCount) {
		throw ApiError.communityNotFound();
	}
};

export const communitiesService = {
	getUserCommunities,
	updateCommunity,
};
