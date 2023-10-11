import { Button, Link } from '@nextui-org/react';
import { useSession } from '~/hooks';
import { useOverlays } from '~/providers';
import { ROUTES } from '~/router';
import Drawer from '../Drawer';

const AppDrawer = () => {
	const { data: session } = useSession();
	const { drawer, communityModal } = useOverlays();

	return (
		<Drawer
			isOpen={drawer.isOpen}
			onOpen={drawer.open}
			onOpenChange={drawer.close}
		>
			{session && session.role === 'admin' && (
				<Button as={Link} href={ROUTES.ADMIN} fullWidth size="lg">
					Admin Dashboard
				</Button>
			)}
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
	);
};

export default AppDrawer;
