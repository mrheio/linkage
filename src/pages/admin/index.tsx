import { Tab, Tabs } from '@nextui-org/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { communitiesService } from '~/services';
import { Community } from '~/types';
import CommunitiesTable from './_communities-table';

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
	const { communities } = props;

	return (
		<div>
			<Tabs>
				<Tab key="communities" title="Communities">
					<CommunitiesTable communities={communities} />
				</Tab>
			</Tabs>
		</div>
	);
};

export default AdminDashboard;
