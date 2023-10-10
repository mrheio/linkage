import { useMutation } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useCreateCommunity = () => {
	return useMutation({
		mutationFn: async ({ uid, data }: { uid: string; data: unknown }) => {
			await myapi.communities.create(uid, data);
		},
	});
};

export default useCreateCommunity;
