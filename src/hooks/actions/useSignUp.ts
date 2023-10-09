import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { myapi } from '~/myapi';
import { ROUTES } from '~/router';
import { SignUpData } from '~/types';

const useSignUp = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: SignUpData) => {
			await myapi.auth.signUp(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
			router.push(ROUTES.HOME);
		},
	});
};

export default useSignUp;
