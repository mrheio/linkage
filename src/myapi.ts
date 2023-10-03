import { Config } from '../config';
import myfetch from './myfetch';
import { validationService } from './services';

export const myapi = () => {
	const BASE_URL = typeof window === undefined ? Config.API_URL : '/api';

	return {
		communities: {
			get: {
				many: async (
					{ includeMembers } = { includeMembers: false },
				) => {
					const data = await myfetch(
						`${BASE_URL}/communities?includeMembers=${includeMembers}`,
					)
						.GET()
						.json();
					return validationService.validateApi.communities.get.many(
						data,
					);
				},
				one: async (cid: string | number) => {
					const data = await myfetch(
						`${BASE_URL}/communitites/${cid}`,
					)
						.GET()
						.json();
					return validationService.validateApi.communities.get.one(
						data,
					);
				},
			},
			create: async (uid: string | number, data: unknown) => {
				const res = await myfetch(
					`${BASE_URL}/users/${uid}/communities`,
				)
					.POST(data)
					.json();
				return res;
			},
			update: async (cid: string | number, data: unknown) => {
				const res = await myfetch(`${BASE_URL}/communities/${cid}`)
					.PATCH(data)
					.json();
				return res;
			},
			delete: async (cid: string | number) => {
				await myfetch(`${BASE_URL}/communities/${cid}`).DELETE().run();
			},
			addUser: async (uid: string | number, cid: string | number) => {
				const res = await myfetch(
					`${BASE_URL}/communities/${cid}/users/${uid}`,
				)
					.POST()
					.json();
				return res;
			},
			removeUser: async (uid: string | number, cid: string | number) => {
				await myfetch(`${BASE_URL}/communities/${cid}/users/${uid}`)
					.DELETE()
					.run();
			},
		},
		posts: {
			get: {
				many: async () => {
					const data = await myfetch(`${BASE_URL}/posts`)
						.GET()
						.json();
					return validationService.validateApi.posts.get.many(data);
				},
				one: async (pid: string | number) => {
					const data = await myfetch(`${BASE_URL}/posts/${pid}`)
						.GET()
						.json();
					return validationService.validateApi.posts.get.one(data);
				},
			},
			create: async (
				uid: string | number,
				cid: string | number,
				data: unknown,
			) => {
				const res = await myfetch(
					`${BASE_URL}/users/${uid}/communities/${cid}/posts`,
				)
					.POST(data)
					.json();
				return res;
			},
			update: async (pid: string | number, data: unknown) => {
				const res = await myfetch(`${BASE_URL}/posts/${pid}`)
					.PATCH(data)
					.json();
				return res;
			},
			delete: async (pid: string | number) => {
				await myfetch(`${BASE_URL}/posts/${pid}`).DELETE().run();
			},
		},
		comments: {
			get: {
				many: async (pid: string | number) => {
					const data = await myfetch(
						`${BASE_URL}/posts/${pid}/comments`,
					)
						.GET()
						.json();
					return validationService.validateApi.comments.get.many(
						data,
					);
				},
			},
			create: async (
				pid: string | number,
				uid: string | number,
				data: unknown,
			) => {
				const res = await myfetch(
					`${BASE_URL}/users/${uid}/posts/${pid}/commments`,
				)
					.POST(data)
					.json();
				return res;
			},
			update: async (commId: string | number, data: unknown) => {
				const res = await myfetch(`${BASE_URL}/comments/${commId}`)
					.PATCH(data)
					.json();
				return res;
			},
			delete: async (commId: string | number) => {
				await myfetch(`${BASE_URL}/comments/${commId}`).DELETE().run();
			},
		},
	};
};
