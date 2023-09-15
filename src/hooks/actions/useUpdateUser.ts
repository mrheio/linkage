import { useMutation } from '@tanstack/react-query';
import myfetch from '~/myfetch';

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
			await myfetch(`/api/users/${uid}`).PATCH(data).run();
		},
		onSuccess,
	});
};

export default useUpdateUser;
