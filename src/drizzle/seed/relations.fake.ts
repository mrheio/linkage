import { faker } from '@faker-js/faker';
import { Community, User, UserToCommunity } from '../schema';

export const generateFakeUsersToCommunities = (
	users: User[],
	communities: Community[],
) => {
	const fakeUsersToCommunities: UserToCommunity[] = [];

	for (const c of communities) {
		fakeUsersToCommunities.push({
			user_id: c.owner_id,
			community_id: c.id,
		});
		const remainingUsers = users.filter((u) => u.id !== c.owner_id);
		for (const u of remainingUsers) {
			const isPartOf = faker.datatype.boolean();
			if (isPartOf) {
				fakeUsersToCommunities.push({
					user_id: u.id,
					community_id: c.id,
				});
			}
		}
	}

	return fakeUsersToCommunities;
};
