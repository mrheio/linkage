import { useMutation } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useUpdateUser = (
	onSuccess?: (
		data: void,
		variables: {
			uid: string;
			data: unknown;
		},
		context: unknown,
	) => unknown,
) => {
	return useMutation({
		mutationFn: async ({ uid, data }: { uid: string; data: unknown }) => {
			await myapi.users.patch(uid, data);
		},
		onSuccess,
	});
};

export default useUpdateUser;
