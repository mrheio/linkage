import { useMutation, useQueryClient } from '@tanstack/react-query';
import myfetch from '~/myfetch';

const useDeleteUserFromCommunity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ uid, cid }: { uid: string; cid: number }) => {
			await myfetch(`/api/communities/${cid}/users/${uid}`)
				.DELETE()
				.run();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['communities']);
		},
	});
};

export default useDeleteUserFromCommunity;
