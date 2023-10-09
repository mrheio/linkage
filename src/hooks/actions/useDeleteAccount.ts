import { useMutation } from '@tanstack/react-query';
import { myapi } from '~/myapi';
import useSession from '../useSession';
import useSignOut from './useSignOut';

const useDeleteAccount = () => {
	const { mutate: signOut } = useSignOut();
	const { data: session } = useSession();

	return useMutation({
		mutationFn: async () => {
			await myapi.users.delete(session.id);
		},
		onSuccess: (data, variables, context) => {
			signOut();
		},
	});
};

export default useDeleteAccount;
