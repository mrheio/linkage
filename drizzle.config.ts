import { loadEnvConfig } from '@next/env';
import { Config } from 'drizzle-kit';
import { cwd } from 'node:process';

loadEnvConfig(cwd());

export default {
	schema: './src/drizzle/schema',
	out: './drizzle/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL,
	},
} satisfies Config;
