import { eq, inArray, notInArray } from 'drizzle-orm';
import { ApiError } from '~/api/responses';
import { communities, db, users, usersToCommunities } from '~/drizzle';
import { getSlug, removeSensitiveUserData } from '~/utils';
import { validationService } from './validation.service';

const getCommunities = async (
	{ includeMembers } = { includeMembers: false },
) => {
	const res = await db.query.communities.findMany({
		with: {
			members: includeMembers ? { with: { user: true } } : undefined,
		},
	});

	return includeMembers
		? res.map((x) => {
				const { members, ...rest } = x;
				const aux = [];

				for (const m of members) {
					const { user } = m as any;
					aux.push(removeSensitiveUserData(user));
				}

				return { ...rest, members: aux };
		  })
		: res;
};

const getCommunity = async (
	cid: string | number,
	{ includeMembers } = { includeMembers: false },
) => {
	const communityId = validationService.validatePositiveNumber(cid);

	const res = await db.query.communities.findFirst({
		with: { members: includeMembers ? true : undefined },
		where: (communities, { eq }) => eq(communities.id, communityId),
	});

	if (!res) {
		throw ApiError.notFound().generic;
	}

	return res;
};

const getUserCommunities = async (
	uid: string,
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

	const res = await db
		.insert(communities)
		.values({
			...communityData,
			slug: getSlug(communityData.name),
			created_by_id: communityData.owner_id,
		})
		.returning();

	await db
		.insert(usersToCommunities)
		.values({ user_id: communityData.owner_id, community_id: res[0].id });

	return res[0];
};

const updateCommunity = async (cid: string | number, data: unknown) => {
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

export const communitiesService = {
	getCommunities,
	getCommunity,
	getUserCommunities,
	createCommunity,
	updateCommunity,
};
