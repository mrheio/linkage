import { useMutation, useQueryClient } from '@tanstack/react-query';
import myfetch from '~/myfetch';

const useSignOut = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			await myfetch('/api/auth/sign-out').POST().run();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
		},
	});
};

export default useSignOut;
