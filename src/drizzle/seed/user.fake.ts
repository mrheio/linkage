import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { fakeModelDates } from './utils';

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

export const generateFakeUsers = (count = 20) => {
	const users = [...Array(count)].map((x) => fakeUser());
	return users;
};
