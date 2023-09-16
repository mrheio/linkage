import { faker } from '@faker-js/faker';
import { User } from '../schema/users';
import { fakeModelDates, getRandomInt } from './utils';

const fakeCommunity = (members: User[], id: number) => {
	const name = faker.word.words(faker.number.int({ min: 1, max: 4 }));
	const description = faker.lorem.paragraphs();
	const slug = name.replaceAll(' ', '-').toLowerCase();
	const [created_at, updated_at, deleted_at] = fakeModelDates();
	const owner_id = members[getRandomInt({ max: members.length - 1 })].id;

	return {
		id,
		name,
		description,
		slug,
		created_at,
		updated_at,
		deleted_at,
		owner_id,
	};
};

export const generateFakeCommunities = (members: User[], count = 10) => {
	const communities = [...Array(count)].map((x, i) =>
		fakeCommunity(members, i),
	);
	return communities;
};
