import { Config } from '../../config';
import myfetch from '../myfetch';

export const myAuthApi = {
	signIn: async (data: unknown) => {
		await myfetch(`${Config.API_URL()}/auth/sign-in`).POST(data).run();
	},
	signOut: async () => {
		await myfetch(`${Config.API_URL()}/auth/sign-out`).POST().run();
	},
	signUp: async (data: unknown) => {
		await myfetch(`${Config.API_URL()}/auth/sign-up`).POST(data).run();
	},
	session: async () => {
		const res = await myfetch(`${Config.API_URL()}/auth/session`)
			.GET()
			.json();
		return res;
	},
};
