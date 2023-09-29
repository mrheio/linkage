const getEnvVar = (key: string) => {
	const value = process.env[key];

	if (!value) {
		throw new Error(`Environment variable ${key} not set`);
	}

	return value;
};

export const Config = {
	API_URL: getEnvVar(
		process.env.NODE_ENV === 'test' ? 'VITE_API_URL' : 'API_URL',
	),
	JWT_SECRET: getEnvVar(
		process.env.NODE_ENV === 'test' ? 'VITE_JWT_SECRET' : 'JWT_SECRET',
	),
};
