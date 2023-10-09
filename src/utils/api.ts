import { User } from '~/types';

export const removeSensitiveUserData = (user: User) => {
	const { password, ...rest } = user;
	return rest;
};

export const removeSensitiveUserDataFromList = (users: User[]) => {
	return users.map((user) => removeSensitiveUserData(user));
};

export const getSlug = (name: string) => {
	return name.replaceAll(' ', '-').toLowerCase();
};

export const stringifyDates = (data: any) => {
	let dates = { created_at: null, updated_at: null, deleted_at: null };

	if (data.created_at) {
		dates = { ...dates, created_at: data.created_at.toString() };
	}
	if (data.updated_at) {
		dates = { ...dates, updated_at: data.updated_at.toString() };
	}
	if (data.deleted_at) {
		dates = { ...dates, deleted_at: data.deleted_at.toString() };
	}

	return { ...data, ...dates };
};

export const datefyData = (data: any) => {
	let dates = {};

	if (data.created_at) {
		dates = { ...dates, created_at: new Date(data.created_at) };
	}
	if (data.updated_at) {
		dates = { ...dates, updated_at: new Date(data.updated_at) };
	}
	if (data.deleted_at) {
		dates = { ...dates, deleted_at: new Date(data.deleted_at) };
	}

	return { ...data, ...dates };
};
