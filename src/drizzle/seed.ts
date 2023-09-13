import { faker } from '@faker-js/faker';
import { loadEnvConfig } from '@next/env';
import { cwd } from 'node:process';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { users } from './schema/users';

const fakeModelDates = ({
	from = '2023-01-01T00:00:00.000Z',
	to = '2023-12-31T00:00:00.000Z',
} = {}): [string, string, null] => {
	const created_at = faker.date
		.between({
			from,
			to,
		})
		.toISOString();

	const updated_at = faker.date
		.between({
			from: created_at,
			to,
		})
		.toISOString();

	const deleted_at = null;

	return [created_at, updated_at, deleted_at];
};

const fakeUser = () => {
	const id = uuidv4();
	const email = faker.internet.email();
	const username = faker.internet.userName();
	const password = faker.internet.password();
	const role = faker.helpers.arrayElement(['user', 'admin']) as
		| 'user'
		| 'admin';
	const [created_at, updated_at, deleted_at] = fakeModelDates();

	return {
		id,
		email,
		username,
		password,
		role,
		created_at,
		updated_at,
		deleted_at,
	};
};

const generateFakeUsers = (count = 12) => {
	const users = [...Array(count)].map((x) => fakeUser());
	return users;
};

const seed = async () => {
	loadEnvConfig(cwd());

	console.log('Deleting old data...');
	await db.delete(users);
	console.log('✓ Old data deleted');

	console.log('Generating new data...');
	const fakeUsers = generateFakeUsers();
	console.log('✓ New data generated');

	console.log('Inserting users...');
	await db.insert(users).values(fakeUsers);
	console.log('✓ Users inserted');

	console.log('✓ New data inserted');

	process.exit(0);
};

seed().catch((err) => {
	console.log(err);
	process.exit(1);
});
