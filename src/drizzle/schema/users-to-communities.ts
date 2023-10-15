import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { communities } from './communities';
import { users } from './users';

export const usersToCommunities = pgTable(
	'users_to_communities',
	{
		user_id: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),

		community_id: integer('community_id')
			.notNull()
			.references(() => communities.id, { onDelete: 'cascade' }),
	},
	(t) => ({ pk: primaryKey(t.user_id, t.community_id) }),
);

export const usersToCommunitiesRelations = relations(
	usersToCommunities,
	({ one }) => ({
		community: one(communities, {
			fields: [usersToCommunities.community_id],
			references: [communities.id],
		}),
		user: one(users, {
			fields: [usersToCommunities.user_id],
			references: [users.id],
		}),
	}),
);
