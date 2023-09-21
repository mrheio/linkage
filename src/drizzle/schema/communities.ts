import { relations } from 'drizzle-orm';
import {
	date,
	pgTable,
	serial,
	text,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';
import { usersToCommunities } from './users-to-communities';

export const communities = pgTable('communities', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	description: text('description'),
	slug: varchar('slug', { length: 256 }).notNull(),
	created_at: date('created_at').defaultNow(),
	updated_at: date('updated_at').defaultNow(),
	deleted_at: date('deleted_at'),
	owner_id: uuid('owner_id')
		.notNull()
		.references(() => users.id),
});

export const communitiesRelations = relations(communities, ({ many }) => ({
	members: many(usersToCommunities),
	posts: many(posts),
}));

export type Community = typeof communities.$inferSelect;
