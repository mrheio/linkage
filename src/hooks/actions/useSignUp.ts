import { useMutation, useQueryClient } from '@tanstack/react-query';
import myfetch from '~/myfetch';
import { SignUpData } from '~/schemas';

const useSignUp = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: SignUpData) => {
			await myfetch('/api/auth/sign-up').POST(data).run();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
		},
	});
};

export default useSignUp;
