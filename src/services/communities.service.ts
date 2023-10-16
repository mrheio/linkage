import { eq, inArray, notInArray } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { communities, db, users, usersToCommunities } from '~/drizzle';
import { CommunityWithMembers } from '~/types';
import { getSlug } from '~/utils';
import { validationService } from './validation.service';

const getCommunities = async (
	{ includeMembers } = { includeMembers: false },
) => {
	if (includeMembers) {
		const res = await db
			.select({ community: communities, user: users })
			.from(communities)
			.innerJoin(
				usersToCommunities,
				eq(usersToCommunities.community_id, communities.id),
			)
			.innerJoin(users, eq(users.id, usersToCommunities.user_id));

		const dataWithJoinedMembers = res.reduce<CommunityWithMembers[]>(
			(acc, current) => {
				const data = acc.find((x) => x.id === current.community.id);

				if (data) {
					return [
						...acc.filter((x) => x.id !== data.id),
						{ ...data, members: [...data.members, current.user] },
					];
				}

				return [
					...acc,
					{ ...current.community, members: [current.user] },
				];
			},
			[],
		);

		return dataWithJoinedMembers;
	}

	const res = await db.select().from(communities);
	return res;
};

const getCommunity = async (
	cid: unknown,
	{ includeMembers } = { includeMembers: false },
) => {
	const communityId = validationService.validatePositiveNumber(cid);

	if (includeMembers) {
		const res = await db
			.select({ community: communities, user: users })
			.from(communities)
			.innerJoin(
				usersToCommunities,
				eq(usersToCommunities.community_id, communities.id),
			)
			.innerJoin(users, eq(users.id, usersToCommunities.user_id))
			.where(eq(communities.id, communityId));

		const dataWithJoinedMembers = res.reduce<CommunityWithMembers[]>(
			(acc, current) => {
				const data = acc.find((x) => x.id === current.community.id);

				if (data) {
					return [
						...acc.filter((x) => x.id !== data.id),
						{ ...data, members: [...data.members, current.user] },
					];
				}

				return [
					...acc,
					{ ...current.community, members: [current.user] },
				];
			},
			[],
		);

		return dataWithJoinedMembers[0];
	}

	const res = await db
		.select()
		.from(communities)
		.where(eq(communities.id, communityId));

	if (res.length === 0) {
		throw ApiError.notFound().generic;
	}

	return res[0];
};

const getUserCommunities = async (
	uid: unknown,
	{ reverse } = { reverse: false },
) => {
	const userId = validationService.validateUuid(uid);

	const innerQuery = db
		.select({
			data: usersToCommunities.community_id,
		})
		.from(usersToCommunities)
		.where(eq(usersToCommunities.user_id, userId));

	const result = await db
		.select()
		.from(communities)
		.where(
			reverse
				? notInArray(communities.id, innerQuery)
				: inArray(communities.id, innerQuery),
		);

	return result;
};

const createCommunity = async (data: unknown) => {
	let communityData = validationService.validateAddCommunityData(data);

	const foundUser = await db
		.select()
		.from(users)
		.where(eq(users.id, communityData.owner_id));

	if (!foundUser.length) {
		throw ApiError.notFound().generic;
	}

	try {
		const res = await db
			.insert(communities)
			.values({
				...communityData,
				slug: getSlug(communityData.name),
				created_by_id: communityData.owner_id,
			})
			.returning();

		await db.insert(usersToCommunities).values({
			user_id: communityData.owner_id,
			community_id: res[0].id,
		});

		return res[0];
	} catch (e) {
		if ((e as any)?.constraint === 'communities_name_unique') {
			throw ApiError.communityNameTaken();
		}

		throw e;
	}
};

const updateCommunity = async (cid: unknown, data: unknown) => {
	const communityId = validationService.validatePositiveNumber(cid);
	let communityData = validationService.validateUpdateCommunityData(data);

	if (communityData.name) {
		communityData = { ...communityData, slug: getSlug(communityData.name) };
	}

	const res = await db
		.update(communities)
		.set(communityData)
		.where(eq(communities.id, communityId))
		.returning();

	if (!res.length) {
		throw ApiError.notFound().generic;
	}

	return res[0];
};

const deleteCommunity = async (cid: unknown) => {
	const communityId = validationService.validatePositiveNumber(cid);

	await db
		.delete(usersToCommunities)
		.where(eq(usersToCommunities.community_id, communityId));
	await db.delete(communities).where(eq(communities.id, communityId));

	return;
};

export const communitiesService = {
	getCommunities,
	getCommunity,
	getUserCommunities,
	createCommunity,
	updateCommunity,
	deleteCommunity,
};
