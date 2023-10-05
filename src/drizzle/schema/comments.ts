import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';

export const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	content: text('content').notNull(),
	upvotes: integer('upvotes').notNull().default(0),
	downvotes: integer('downvotes').notNull().default(0),
	created_at: timestamp('create_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
	deleted_at: timestamp('deleted_at'),
	post_id: integer('post_id')
		.notNull()
		.references(() => posts.id, { onDelete: 'cascade' }),
	created_by_id: uuid('created_by_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	reply_to_id: integer('reply_to_id'),
});

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.post_id],
		references: [posts.id],
	}),
	user: one(users, {
		fields: [comments.created_by_id],
		references: [users.id],
	}),
	reply_to_id: one(comments, {
		fields: [comments.reply_to_id],
		references: [comments.id],
	}),
}));
