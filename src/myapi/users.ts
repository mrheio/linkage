import myfetch from '~/myfetch';
import { validationService } from '~/services';
import { Config } from '../../config';

export const myUsersApi = {
	get: {
		one: async (uid: string) => {
			const data = await myfetch(`${Config.API_URL()}/users/${uid}`)
				.GET()
				.json();
			return validationService.validateApi.users.get.one(data);
		},
	},
	patch: async (uid: string, data: unknown) => {
		const res = await myfetch(`${Config.API_URL()}/users/${uid}`)
			.PATCH(data)
			.json();
		return res;
	},
	delete: async (uid: string) => {
		await myfetch(`${Config.API_URL()}/users/${uid}`).DELETE().run();
	},
};
