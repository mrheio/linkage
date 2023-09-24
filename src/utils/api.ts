import { User } from '~/drizzle';

export const removeSensitiveUserData = (user: User) => {
	const { password, ...rest } = user;
	return rest;
};

export const removeSensitiveUserDataFromList = (users: User[]) => {
	return users.map((user) => removeSensitiveUserData(user));
};

export const getCommunitySlug = (communityName: string) =>
	communityName.replaceAll(' ', '-').toLowerCase();

export const getSlug = (name: string) =>
	name.replaceAll(' ', '-').toLowerCase();
