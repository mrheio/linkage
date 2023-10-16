import myfetch from '~/myfetch';
import { validationService } from '~/services';
import { Config } from '../../config';

export const myCommentsApi = {
	get: {
		many: async (pid: string | number) => {
			const data = await myfetch(
				`${Config.API_URL()}/posts/${pid}/comments`,
			)
				.GET()
				.json();
			return validationService.validateApi.comments.get.many(data);
		},
	},
	create: async (
		pid: string | number,
		uid: string | number,
		data: unknown,
	) => {
		const res = await myfetch(
			`${Config.API_URL()}/users/${uid}/posts/${pid}/commments`,
		)
			.POST(data)
			.json();
		return res;
	},
	update: async (commId: string | number, data: unknown) => {
		const res = await myfetch(`${Config.API_URL()}/comments/${commId}`)
			.PATCH(data)
			.json();
		return res;
	},
	delete: async (commId: string | number) => {
		await myfetch(`${Config.API_URL()}/comments/${commId}`).DELETE().run();
	},
};
