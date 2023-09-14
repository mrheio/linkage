import { useMutation, useQueryClient } from '@tanstack/react-query';
import myfetch from '~/myfetch';
import { SignInData } from '~/schemas';

const useSignIn = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: SignInData) => {
			await myfetch('/api/auth/sign-in').POST(data).run();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
		},
	});
};

export default useSignIn;
