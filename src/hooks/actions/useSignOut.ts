import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { myapi } from '~/myapi';

const useSignOut = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: async () => {
			await myapi.auth.signOut();
		},
		onSuccess: () => {
			router.reload();
		},
	});
};

export default useSignOut;
