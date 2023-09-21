import { faker } from '@faker-js/faker';
import { Community, Post, User } from '../schema';
import { fakeModelDates, getRandomInt } from './utils';

const fakePost = (
	users: User[],
	communities: Community[],
	id: number,
): Post => {
	const title = faker.word.words(faker.number.int({ min: 1, max: 4 }));
	const content = faker.lorem.paragraphs();
	const slug = title.replaceAll(' ', '-').toLowerCase();
	const upvotes = faker.number.int({ min: 0, max: 100 });
	const downvotes = faker.number.int({ min: 0, max: 100 });
	const [created_at, updated_at, deleted_at] = fakeModelDates();
	const created_by_id = users[getRandomInt({ max: users.length - 1 })].id;
	const community_id =
		communities[getRandomInt({ max: communities.length - 1 })].id;

	return {
		id,
		title,
		content,
		slug,
		upvotes,
		downvotes,
		created_at: new Date(created_at),
		updated_at: new Date(updated_at),
		deleted_at,
		created_by_id,
		community_id,
	};
};

export const generateFakePosts = (
	users: User[],
	communities: Community[],
	count = 10,
) => {
	const posts = [...Array(count)].map((x, i) =>
		fakePost(users, communities, i),
	);
	return posts;
};
