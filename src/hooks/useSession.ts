import { useQuery } from '@tanstack/react-query';
import myfetch from '~/myfetch';

const useSession = () => {
	return useQuery({
		queryKey: ['session'],
		queryFn: async () => {
			const data = await myfetch('/api/auth/session').GET().json();
			return data.payload;
		},
	});
};

export default useSession;
