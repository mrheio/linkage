import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import myfetch from '~/myfetch';

const useSignOut = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async () => {
			await myfetch('/api/auth/sign-out').POST().run();
		},
		onSuccess: () => {
			router.reload();
		},
	});
};

export default useSignOut;
