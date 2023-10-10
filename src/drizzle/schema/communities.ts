import { relations } from 'drizzle-orm';
import {
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';
import { usersToCommunities } from './users-to-communities';

export const communities = pgTable('communities', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).unique().notNull(),
	description: text('description'),
	slug: varchar('slug', { length: 256 }).unique().notNull(),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
	deleted_at: timestamp('deleted_at'),
	owner_id: uuid('owner_id')
		.notNull()
		.references(() => users.id),
	created_by_id: uuid('created_by_id').references(() => users.id),
});

export const communitiesRelations = relations(communities, ({ one, many }) => ({
	members: many(usersToCommunities),
	posts: many(posts),
	creator: one(users, {
		fields: [communities.created_by_id],
		references: [users.id],
	}),
}));
