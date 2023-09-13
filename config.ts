const getEnvVar = (key: string) => {
	const value = process.env[key];

	if (!value) {
		throw new Error(`Environment variable ${key} not set`);
	}

	return value;
};

export const Config = {
	API_URL: getEnvVar('API_URL'),
	JWT_SECRET: getEnvVar('JWT_SECRET'),
};
