import { faker } from '@faker-js/faker';
import { Comment, Post, User } from '../../types';
import { fakeModelDates, getRandomInt } from './utils';

const fakeComment = (users: User[], posts: Post[], id: number): Comment => {
	const content = faker.lorem.paragraphs();
	const upvotes = faker.number.int({ min: 0, max: 100 });
	const downvotes = faker.number.int({ min: 0, max: 100 });
	const [created_at, updated_at, deleted_at] = fakeModelDates();
	const post_id = posts[getRandomInt({ max: posts.length - 1 })].id;
	const created_by_id = users[getRandomInt({ max: users.length - 1 })].id;

	return {
		id,
		content,
		upvotes,
		downvotes,
		created_at,
		updated_at,
		deleted_at,
		post_id,
		created_by_id,
		reply_to_id: null,
	};
};

export const generateFakeComments = (
	users: User[],
	posts: Post[],
	count = 64,
) => {
	const comments = [...Array(count)].map((x, i) =>
		fakeComment(users, posts, i),
	);
	return comments;
};
