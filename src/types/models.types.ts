import { z } from 'zod';
import {
	commentSchema,
	communitySchema,
	communityWithMembersSchema,
	postSchema,
	sessionSchema,
	userSchema,
	usersToCommunitiesSchema,
} from '~/schemas';

export type Session = z.infer<typeof sessionSchema>;
export type User = z.infer<typeof userSchema> & { password: string };
export type SafeUser = Omit<User, 'password'>;
export type Community = z.infer<typeof communitySchema>;
export type CommunityWithMembers = z.infer<typeof communityWithMembersSchema>;
export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type UserToCommunity = z.infer<typeof usersToCommunitiesSchema>;
