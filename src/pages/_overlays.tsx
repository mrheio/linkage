import {
	AddCommunityModal,
	AppDrawer,
	CommunityDetailsModal,
} from '~/components';
import { useOverlays } from '~/providers';

const Overlays = () => {
	const { communityModal } = useOverlays();

	return (
		<>
			<AppDrawer />
			{communityModal.isOpen && <AddCommunityModal />}
			<CommunityDetailsModal />
		</>
	);
};

export default Overlays;
