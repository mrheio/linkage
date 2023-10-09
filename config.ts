const getEnvVar = (key: string) => {
	const value = process.env[key];

	if (!value) {
		throw new Error(`Environment variable ${key} not set`);
	}

	return value;
};

export const Config = {
	API_URL: () => {
		if (typeof window !== 'undefined') {
			return '/api';
		}

		if (process.env.NODE_ENV === 'test') {
			return getEnvVar('VITE_API_URL');
		}

		return getEnvVar('API_URL');
	},
	JWT_SECRET: () => {
		if (typeof window !== 'undefined') {
			return '';
		}

		if (process.env.NODE_ENV === 'test') {
			return getEnvVar('VITE_JWT_SECRET');
		}

		return getEnvVar('JWT_SECRET');
	},
};
