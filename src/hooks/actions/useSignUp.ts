import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import myfetch from '~/myfetch';
import { ROUTES } from '~/router';
import { SignUpData } from '~/schemas';

const useSignUp = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: SignUpData) => {
			await myfetch('/api/auth/sign-up').POST(data).run();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['session']);
			router.push(ROUTES.HOME);
		},
	});
};

export default useSignUp;
