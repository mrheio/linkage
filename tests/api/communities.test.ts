import { expect, test } from 'vitest';
import myfetch from '~/myfetch';
import { getSlug } from '~/utils';
import { Config } from '../../config';

test('calling GET /communities should return communities inside payload.items', async () => {
	const data = await myfetch(`${Config.API_URL}/communities`).json();
	const item = data.payload.items[0];

	expect(data).toHaveProperty('payload.items');
	expect(data.payload).toBeTypeOf('object');
	expect(Array.isArray(data.payload.items)).toBe(true);

	expect(item).toHaveProperty('id');
	expect(item).toHaveProperty('name');
	expect(item).toHaveProperty('description');
	expect(item).toHaveProperty('slug');
	expect(item).toHaveProperty('created_at');
	expect(item).toHaveProperty('updated_at');
	expect(item).toHaveProperty('deleted_at');
	expect(item).toHaveProperty('owner_id');
	expect(item).toHaveProperty('created_by_id');

	expect(new Date(item.created_at)).toBeInstanceOf(Date);
	expect(new Date(item.updated_at)).toBeInstanceOf(Date);

	expect(getSlug(item.name)).toEqual(item.slug);
});

test('calling GET /communities with ?includeMembers=true should return communities inside payload.items and each community should have a members property', async () => {
	const data = await myfetch(
		`${Config.API_URL}/communities?includeMembers=true`,
	).json();

	expect(data).toHaveProperty('payload.items');
	expect(data.payload).toBeTypeOf('object');
	expect(Array.isArray(data.payload.items)).toBe(true);

	const item = data.payload.items[0];

	expect(item).toHaveProperty('id');
	expect(item).toHaveProperty('name');
	expect(item).toHaveProperty('description');
	expect(item).toHaveProperty('slug');
	expect(item).toHaveProperty('created_at');
	expect(item).toHaveProperty('updated_at');
	expect(item).toHaveProperty('deleted_at');
	expect(item).toHaveProperty('owner_id');
	expect(item).toHaveProperty('created_by_id');
	expect(item).toHaveProperty('members');

	expect(new Date(item.created_at)).toBeInstanceOf(Date);
	expect(new Date(item.updated_at)).toBeInstanceOf(Date);
	expect(getSlug(item.name)).toEqual(item.slug);
	expect(Array.isArray(item.members)).toBe(true);

	expect(item.members.length).toBeGreaterThan(0);

	const member = item.members[0];

	expect(member).toHaveProperty('id');
	expect(member).toHaveProperty('email');
	expect(member).toHaveProperty('username');
	expect(member).toHaveProperty('role');
	expect(['user', 'admin'].includes(member.role)).toBe(true);
	expect(member).toHaveProperty('created_at');
	expect(member).toHaveProperty('updated_at');
	expect(member).toHaveProperty('deleted_at');

	expect(new Date(member.created_at)).toBeInstanceOf(Date);
	expect(new Date(member.updated_at)).toBeInstanceOf(Date);
});
