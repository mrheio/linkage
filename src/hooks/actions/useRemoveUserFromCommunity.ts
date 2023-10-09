import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useDeleteUserFromCommunity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ uid, cid }: { uid: string; cid: number }) => {
			await myapi.communities.removeUser(uid, cid);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['communities']);
		},
	});
};

export default useDeleteUserFromCommunity;
