import { useQuery } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useUserCommunities = (
	uid: string,
	{ initialData = [], reverse = false } = {},
) => {
	return useQuery({
		initialData,
		queryKey: ['communities', uid, { reverse }],
		queryFn: async ({ queryKey }) => {
			const [, uid, { reverse }] = queryKey;
			const result = await myapi.communities.get.user(uid, {
				reverse,
			});
			return result.payload.items;
		},
	});
};

export default useUserCommunities;
