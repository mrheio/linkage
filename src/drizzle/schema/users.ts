import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: varchar('email', { length: 256 }).unique(),
	username: varchar('username', { length: 256 }).unique(),
	password: varchar('password', { length: 256 }),
	role: varchar('role', { enum: ['user', 'admin'] }).default('user'),
	created_at: date('created_at').defaultNow(),
	updated_at: date('updated_at').defaultNow(),
	deleted_at: date('deleted_at'),
});

export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, 'password'>;
