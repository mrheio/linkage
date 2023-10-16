import { myAuthApi } from './auth';
import { myCommentsApi } from './comments';
import { myCommunitiesApi } from './communities';
import { myPostsApi } from './posts';
import { myUsersApi } from './users';

export const myapi = {
	auth: myAuthApi,
	users: myUsersApi,
	communities: myCommunitiesApi,
	posts: myPostsApi,
	comments: myCommentsApi,
};
