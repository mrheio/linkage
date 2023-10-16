import myfetch from '~/myfetch';
import { validationService } from '~/services';
import { Config } from '../../config';

export const myPostsApi = {
	get: {
		many: async () => {
			const data = await myfetch(`${Config.API_URL()}/posts`)
				.GET()
				.json();
			return validationService.validateApi.posts.get.many(data);
		},
		one: async (pid: string | number) => {
			const data = await myfetch(`${Config.API_URL()}/posts/${pid}`)
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
			`${Config.API_URL()}/users/${uid}/communities/${cid}/posts`,
		)
			.POST(data)
			.json();
		return res;
	},
	update: async (pid: string | number, data: unknown) => {
		const res = await myfetch(`${Config.API_URL()}/posts/${pid}`)
			.PATCH(data)
			.json();
		return res;
	},
	delete: async (pid: string | number) => {
		await myfetch(`${Config.API_URL()}/posts/${pid}`).DELETE().run();
	},
};
