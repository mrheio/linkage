import { and, eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { db, usersToCommunities } from '~/drizzle';
import { validationService } from './validation.service';

const addUserToCommunity = async (uid: unknown, cid: unknown) => {
	const userId = validationService.validateUuid(uid);
	const communityId = validationService.validatePositiveNumber(cid);

	try {
		await db
			.insert(usersToCommunities)
			.values({ user_id: userId, community_id: communityId })
			.returning();
	} catch (e) {
		// TODO: refactor the way sql errors are handled
		if ((e as any).code === '23505') {
			throw ApiError.userAlreadyInCommunity();
		}

		throw e;
	}
};

const deleteUserFromCommunity = async (uid: unknown, cid: unknown) => {
	const userId = validationService.validateUuid(uid);
	const communityId = validationService.validatePositiveNumber(cid);

	await db
		.delete(usersToCommunities)
		.where(
			and(
				eq(usersToCommunities.user_id, userId),
				eq(usersToCommunities.community_id, communityId),
			),
		);
};

export const relationsService = {
	addUserToCommunity,
	deleteUserFromCommunity,
};
