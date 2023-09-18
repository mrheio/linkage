import { useQuery } from '@tanstack/react-query';
import myfetch from '~/myfetch';

const useUserCommunities = (
	uid: string,
	{ initialData = [], reverse = false } = {},
) => {
	return useQuery({
		initialData,
		queryKey: ['communities', uid, { reverse }],
		queryFn: async ({ queryKey }) => {
			const result = await myfetch(
				`/api/users/${queryKey[1]}/communities?reverse=${reverse}`,
			)
				.GET()
				.json();
			return result.payload.items;
		},
	});
};

export default useUserCommunities;
