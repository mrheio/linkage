export const removeSensitiveUserData = (user) => {
	const { password, ...rest } = user;
	return rest;
};

export const removeSensitiveUserDataFromList = (users) => {
	return users.map((user) => removeSensitiveUserData(user));
};
