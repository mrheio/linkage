import { useQuery } from '@tanstack/react-query';
import { myapi } from '~/myapi';
import { Community } from '~/types';

const useCommunities = (initialData: Community[]) => {
	return useQuery({
		queryKey: ['communities'],
		queryFn: async () => {
			const res = await myapi.communities.get.many();
			return res.payload.items;
		},
		initialData,
	});
};

export default useCommunities;
