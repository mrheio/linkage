import { and, eq } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { communities, db, users, usersToCommunities } from '~/drizzle';
import { UpdateCommunityData } from '~/schemas';
import { getCommunitySlug, removeSensitiveUserData } from '~/utils';
import { validationService } from './validation.service';

const getCommunities = async (
	{ includeMembers } = { includeMembers: false },
) => {
	if (includeMembers) {
		const result = await db
			.select({
				id: communities.id,
				name: communities.name,
				description: communities.description,
				slug: communities.slug,
				created_at: communities.created_at,
				updated_at: communities.updated_at,
				deleted_at: communities.deleted_at,
				owner_id: communities.owner_id,
				user: users,
			})
			.from(communities)
			.innerJoin(
				usersToCommunities,
				eq(communities.id, usersToCommunities.community_id),
			)
			.innerJoin(users, eq(users.id, usersToCommunities.user_id));

		let data: (Omit<(typeof result)[0], 'user'> & { members: any[] })[] =
			[];

		for (const x of result) {
			const found = data.find((e) => e.id === x.id);
			if (found) {
				data = [
					...data.filter((e) => e.id !== found.id),
					{
						...found,
						members: [
							...found.members,
							removeSensitiveUserData(x.user),
						],
					},
				];
			} else {
				const { user, ...rest } = x;
				data = [
					...data,
					{ ...rest, members: [removeSensitiveUserData(user)] },
				];
			}
		}

		return data;
	}

	const result = await db.select().from(communities);
	return result;
};

const getUserCommunities = async (uid: string) => {
	const userId = validationService.validateUuid(uid);

	const result = await db
		.select({ community: communities })
		.from(usersToCommunities)
		.where(eq(usersToCommunities.user_id, userId))
		.innerJoin(
			communities,
			eq(usersToCommunities.community_id, communities.id),
		);

	return result.map((x) => x.community);
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

const addUserToCommunity = async (uid: string, cid: number) => {
	const userId = validationService.validateUuid(uid);
	const communityId = validationService.validatePositiveNumber(cid);

	try {
		await db
			.insert(usersToCommunities)
			.values({ user_id: userId, community_id: communityId });
	} catch (e) {
		// TODO: refactor the way sql errors are handled
		if ((e as any).code === '23505') {
			throw ApiError.userAlreadyInCommunity();
		}

		throw e;
	}
};

const deleteUserFromCommunity = async (uid: string, cid: number) => {
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

export const communitiesService = {
	getCommunities,
	getUserCommunities,
	updateCommunity,
	addUserToCommunity,
	deleteUserFromCommunity,
};
