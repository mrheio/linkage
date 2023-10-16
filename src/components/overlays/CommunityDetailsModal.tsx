import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { useOverlays } from '~/providers';
import { msSinceEpochToDate } from '~/utils';

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
							<p>
								Created At:{' '}
								{msSinceEpochToDate(community?.created_at)}
							</p>
							<p>
								Updated At:{' '}
								{msSinceEpochToDate(community?.updated_at)}
							</p>
							<p>
								Deleted At:{' '}
								{msSinceEpochToDate(community?.deleted_at) ??
									'not yet'}
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
