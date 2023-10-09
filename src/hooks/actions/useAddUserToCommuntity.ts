import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useAddUserToCommunity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ uid, cid }: { uid: string; cid: number }) => {
			await myapi.communities.addUser(uid, cid);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['communities']);
		},
	});
};

export default useAddUserToCommunity;
