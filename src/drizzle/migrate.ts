import { loadEnvConfig } from '@next/env';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { cwd } from 'node:process';
import { db } from './db';

const run = async () => {
	loadEnvConfig(cwd());
	console.log('Migrations running...');
	await migrate(db, { migrationsFolder: 'drizzle/migrations' });
	console.log('✓ Migrations completed');
	process.exit(0);
};

run().catch((err) => {
	console.log(err);
	process.exit(1);
});
