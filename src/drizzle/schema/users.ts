import { relations } from 'drizzle-orm';
import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersToCommunities } from './users-to-communities';

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

export const usersRelations = relations(users, ({ many }) => ({
	communities: many(usersToCommunities),
}));

export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, 'password'>;
