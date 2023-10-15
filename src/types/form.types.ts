import { z } from 'zod';
import {
	addCommunitySchema,
	addPostSchema,
	createCommentSchema,
	deleteUserSchema,
	generateTokensSchema,
	refreshSessionSchema,
	signInSchema,
	signUpSchema,
	updateCommunitySchema,
	updatePostSchema,
	updateUserSchema,
} from '~/schemas';

export type GenerateTokensData = z.infer<typeof generateTokensSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type RefreshSessionData = z.infer<typeof refreshSessionSchema>;

export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type DeleteUserData = z.infer<typeof deleteUserSchema>;

export type AddCommunityData = z.infer<typeof addCommunitySchema>;
export type UpdateCommunityData = z.infer<typeof updateCommunitySchema>;

export type AddPostData = z.infer<typeof addPostSchema>;
export type UpdatePostData = z.infer<typeof updatePostSchema>;

export type CreateCommentData = z.infer<typeof createCommentSchema>;
export type UpdateCommentData = z.infer<typeof updateCommunitySchema>;
