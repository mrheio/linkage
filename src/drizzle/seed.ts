import { loadEnvConfig } from '@next/env';
import { cwd } from 'node:process';
import { db } from './db';
import {
	comments,
	communities,
	posts,
	users,
	usersToCommunities,
} from './schema/index';
import {
	generateFakeComments,
	generateFakeCommunities,
	generateFakePosts,
	generateFakeUsers,
	generateFakeUsersToCommunities,
} from './seed/index';

const deleteData = async () => {
	await db.delete(comments);
	await db.delete(posts);
	await db.delete(usersToCommunities);
	await db.delete(communities);
	await db.delete(users);
};

const generateFakeData = () => {
	const fakeUsers = generateFakeUsers();
	const fakeCommunities = generateFakeCommunities(fakeUsers);
	const fakeUsersToCommunities = generateFakeUsersToCommunities(
		fakeUsers,
		fakeCommunities,
	);
	const fakePosts = generateFakePosts(fakeUsers, fakeCommunities);
	const fakeComments = generateFakeComments(fakeUsers, fakePosts);
	return {
		users: fakeUsers,
		communities: fakeCommunities,
		usersToCommunities: fakeUsersToCommunities,
		posts: fakePosts,
		comments: fakeComments,
	};
};

const seed = async () => {
	loadEnvConfig(cwd());

	console.log('Deleting old data...');
	await deleteData();
	console.log('✓ Old data deleted');

	console.log('Generating new data...');
	const fake = generateFakeData();
	console.log('✓ New data generated');

	console.log('Inserting new data...');

	console.log('-- Inserting users...');
	await db.insert(users).values(fake.users);
	console.log('-- ✓ Users inserted');

	console.log('-- Inserting communities...');
	await db.insert(communities).values(fake.communities);
	console.log('-- ✓ Communities inserted');

	console.log('-- Inserting users to communities relations...');
	await db.insert(usersToCommunities).values(fake.usersToCommunities);
	console.log('-- ✓ Users to communities relations inserted');

	console.log('-- Inserting posts...');
	await db.insert(posts).values(fake.posts);
	console.log('-- ✓ Posts inserted');

	console.log('-- Inserting comments...');
	await db.insert(comments).values(fake.comments);
	console.log('-- ✓ Comments inserted');

	console.log('✓ New data inserted');

	process.exit(0);
};

seed().catch((err) => {
	console.log(err);
	process.exit(1);
});
