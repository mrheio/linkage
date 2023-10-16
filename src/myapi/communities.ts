import myfetch from '~/myfetch';
import { validationService } from '~/services';
import { Config } from '../../config';

export const myCommunitiesApi = {
	get: {
		many: async ({ includeMembers } = { includeMembers: false }) => {
			const data = await myfetch(
				`${Config.API_URL()}/communities?includeMembers=${includeMembers}`,
			)
				.GET()
				.json();
			return validationService.validateApi.communities.get.many(data);
		},
		one: async (cid: string | number) => {
			const data = await myfetch(
				`${Config.API_URL()}/communitites/${cid}`,
			)
				.GET()
				.json();
			return validationService.validateApi.communities.get.one(data);
		},
		user: async (uid: string, { reverse } = { reverse: false }) => {
			const data = await myfetch(
				`${Config.API_URL}/users/${uid}/communities?reverse=${reverse}`,
			)
				.GET()
				.json();
			return validationService.validateApi.communities.get.many(data);
		},
	},
	create: async (uid: string | number, data: unknown) => {
		const res = await myfetch(
			`${Config.API_URL()}/users/${uid}/communities`,
		)
			.POST(data)
			.json();
		return res;
	},
	update: async (cid: string | number, data: unknown) => {
		const res = await myfetch(`${Config.API_URL()}/communities/${cid}`)
			.PATCH(data)
			.json();
		return res;
	},
	delete: async (cid: string | number) => {
		await myfetch(`${Config.API_URL()}/communities/${cid}`).DELETE().run();
	},
	addUser: async (uid: string | number, cid: string | number) => {
		const res = await myfetch(
			`${Config.API_URL()}/communities/${cid}/users/${uid}`,
		)
			.POST()
			.json();
		return res;
	},
	removeUser: async (uid: string | number, cid: string | number) => {
		await myfetch(`${Config.API_URL()}/communities/${cid}/users/${uid}`)
			.DELETE()
			.run();
	},
};
