import { comments, communities, posts, users } from './schema';

export type DbUser = typeof users.$inferSelect;
export type DbCommunity = typeof communities.$inferSelect;
export type DbPost = typeof posts.$inferSelect;
export type DbComment = typeof comments.$inferSelect;
