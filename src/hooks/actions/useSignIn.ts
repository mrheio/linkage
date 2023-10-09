import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { myapi } from '~/myapi';
import { ROUTES } from '~/router';
import { SignInData } from '~/types';

const useSignIn = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: SignInData) => {
			await myapi.auth.signIn(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
			router.push(ROUTES.HOME);
		},
	});
};

export default useSignIn;
