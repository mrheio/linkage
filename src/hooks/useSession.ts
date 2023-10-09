import { useQuery } from '@tanstack/react-query';
import { myapi } from '~/myapi';

const useSession = () => {
	return useQuery({
		queryKey: ['session'],
		queryFn: async () => {
			const data = await myapi.auth.session();
			return data.payload;
		},
	});
};

export default useSession;
