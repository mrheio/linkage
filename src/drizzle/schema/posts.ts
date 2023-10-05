import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { communities } from './communities';
import { users } from './users';

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 256 }).notNull(),
	content: text('content').notNull(),
	slug: varchar('slug', { length: 256 }).notNull(),
	upvotes: integer('upvotes').notNull().default(0),
	downvotes: integer('downvotes').notNull().default(0),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
	deleted_at: timestamp('deleted_at'),
	created_by_id: uuid('created_by_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	community_id: integer('community_id')
		.notNull()
		.references(() => communities.id, { onDelete: 'cascade' }),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	user: one(users, {
		fields: [posts.created_by_id],
		references: [users.id],
	}),
	community: one(communities, {
		fields: [posts.community_id],
		references: [communities.id],
	}),
}));
