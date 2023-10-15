import { faker } from '@faker-js/faker';
import { User } from '../../types';
import { fakeModelDates, getRandomInt } from './utils';

const fakeCommunity = (members: User[], id: number) => {
	const name = faker.word.words(faker.number.int({ min: 1, max: 4 }));
	const description = faker.lorem.paragraphs();
	const slug = name.replaceAll(' ', '-').toLowerCase();
	const [created_at, updated_at, deleted_at] = fakeModelDates();
	const owner_id = members[getRandomInt({ max: members.length - 1 })].id;
	const created_by_id = owner_id;

	return {
		id,
		name,
		description,
		slug,
		created_at,
		updated_at,
		deleted_at,
		owner_id,
		created_by_id,
	};
};

export const generateFakeCommunities = (members: User[], count = 32) => {
	const communities = [...Array(count)].map((x, i) =>
		fakeCommunity(members, i),
	);
	return communities;
};
