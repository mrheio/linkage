import { faker } from '@faker-js/faker';

export const fakeModelDates = ({
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

export const getRandomInt = ({ min = 0, max = 100 } = {}) => {
	return faker.number.int({ min, max });
};
