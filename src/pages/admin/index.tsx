import { Button, Tab, Tabs } from '@nextui-org/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { CommunitiesTab } from '~/components';
import { useCommunities } from '~/hooks';
import { useOverlays } from '~/providers';
import { communitiesService } from '~/services';
import { Community } from '~/types';

type AdminDashboardProps = {
	communities: Community[];
};

export const getServerSideProps: GetServerSideProps<
	AdminDashboardProps
> = async (ctx) => {
	const communities = await communitiesService.getCommunities();

	return { props: { communities: JSON.parse(JSON.stringify(communities)) } };
};

const AdminDashboard = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	const { data: communities } = useCommunities(props.communities);
	const { communityModal } = useOverlays();

	return (
		<>
			<div className="fixed left-0 top-0 z-40 h-screen w-[24%] max-w-xs p-12 shadow-none">
				<Button fullWidth onClick={communityModal.open}>
					Create Community
				</Button>
			</div>

			<div>
				<Tabs>
					<Tab key="communities" title="Communities">
						<CommunitiesTab communities={communities} />
					</Tab>
				</Tabs>
			</div>
		</>
	);
};

export default AdminDashboard;
