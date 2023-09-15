import { useMutation } from '@tanstack/react-query';
import myfetch from '~/myfetch';

const useUpdateUser = () => {
	return useMutation({
		mutationFn: async ({ uid, data }: { uid: string; data: unknown }) => {
			await myfetch(`/api/users/${uid}`).PATCH(data).run();
		},
	});
};

export default useUpdateUser;
