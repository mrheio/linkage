import { loadEnvConfig } from '@next/env';
import { cwd } from 'node:process';
import { db } from './db';
import { communities, users, usersToCommunities } from './schema/index';
import {
	generateFakeCommunities,
	generateFakeUsers,
	generateFakeUsersToCommunities,
} from './seed/index';

const seed = async () => {
	loadEnvConfig(cwd());

	console.log('Deleting old data...');
	await db.delete(usersToCommunities);
	await db.delete(communities);
	await db.delete(users);
	console.log('✓ Old data deleted');

	console.log('Generating new data...');
	const fakeUsers = generateFakeUsers();
	const fakeCommunities = generateFakeCommunities(fakeUsers);
	const fakeUsersToCommunities = generateFakeUsersToCommunities(
		fakeUsers,
		fakeCommunities,
	);
	console.log('✓ New data generated');

	console.log('Inserting new data...');

	console.log('-- Inserting users...');
	await db.insert(users).values(fakeUsers);
	console.log('-- ✓ Users inserted');

	console.log('-- Inserting communities...');
	await db.insert(communities).values(fakeCommunities);
	console.log('-- ✓ Communities inserted');

	console.log('-- Inserting users to communities relations...');
	await db.insert(usersToCommunities).values(fakeUsersToCommunities);
	console.log('-- ✓ Users to communities relations inserted');

	console.log('✓ New data inserted');

	process.exit(0);
};

seed().catch((err) => {
	console.log(err);
	process.exit(1);
});
