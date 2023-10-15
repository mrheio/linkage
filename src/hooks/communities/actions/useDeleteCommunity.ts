import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useDeleteCommunity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ cid }: { cid: string | number }) => {
			return myapi.communities.delete(cid);
		},
		onSuccess: () => {
			console.log('test');

			queryClient.invalidateQueries(['communities']);
		},
	});
};

export default useDeleteCommunity;
