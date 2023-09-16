import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
import { SignUpData } from '~/schemas';

const hashPassword = (password: string) => {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);

	return hash;
};

const comparePasswords = (password: string, hashedPassword: string) => {
	return compareSync(password, hashedPassword);
};

const getSecuredUserData = (data: SignUpData) => {
	return { ...data, password: hashPassword(data.password) };
};

export const securityService = {
	hashPassword,
	comparePasswords,
	getSecuredUserData,
};
