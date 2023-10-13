import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { useOverlays } from '~/providers';

const CommunityDetailsModal = () => {
	const { communityDetailsModal } = useOverlays();
	const { community } = communityDetailsModal;

	return (
		<Modal
			isOpen={communityDetailsModal.isOpen}
			onOpenChange={communityDetailsModal.onChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>
							<h3 className="text-xl">{community?.name}</h3>
						</ModalHeader>
						<ModalBody>
							{community?.description ?? 'No description :(('}
						</ModalBody>
						<ModalFooter className="flex flex-col">
							<p>Slug: /{community?.slug}</p>
							<p>Created At: {community?.created_at}</p>
							<p>Updated At: {community?.updated_at}</p>
							<p>
								Deleted At: {community?.deleted_at ?? 'not yet'}
							</p>
							<p>Created by: {community?.created_by_id}</p>
							<p>Owned by: {community?.owner_id}</p>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CommunityDetailsModal;
