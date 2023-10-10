import { Button } from '@nextui-org/react';
import { Drawer } from '~/components';
import { useOverlays } from '~/providers';
import AddCommunityModal from './_add-community-modal';

const Overlays = () => {
	const { drawer, communityModal } = useOverlays();

	return (
		<>
			<Drawer
				isOpen={drawer.isOpen}
				onOpen={drawer.open}
				onOpenChange={drawer.close}
			>
				<Button fullWidth size="lg" color="primary">
					Create Post
				</Button>
				<Button
					fullWidth
					size="lg"
					color="secondary"
					variant="flat"
					onClick={communityModal.open}
				>
					Create Community
				</Button>
			</Drawer>

			<AddCommunityModal />
		</>
	);
};

export default Overlays;
