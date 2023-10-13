import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useCreateCommunity = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ uid, data }: { uid: string; data: unknown }) => {
			await myapi.communities.create(uid, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['communities'] });
		},
	});
};

export default useCreateCommunity;
