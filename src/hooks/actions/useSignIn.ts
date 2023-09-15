import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import myfetch from '~/myfetch';
import { ROUTES } from '~/router';
import { SignInData } from '~/schemas';

const useSignIn = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: SignInData) => {
			await myfetch('/api/auth/sign-in').POST(data).run();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
			router.push(ROUTES.HOME);
		},
	});
};

export default useSignIn;
