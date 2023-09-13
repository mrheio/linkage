import { loadEnvConfig } from '@next/env';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { cwd } from 'node:process';

const db = drizzle(sql);

const setup = async () => {
	loadEnvConfig(cwd());
	console.log('Migrations running...');
	await migrate(db, { migrationsFolder: 'drizzle/migrations' });
	console.log('✓ Migrations completed');
	process.exit(0);
};

setup().catch((err) => {
	console.log(err);
	process.exit(1);
});
