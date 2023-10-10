import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { useOverlays } from '~/providers';

const AddCommunityModal = () => {
	const { communityModal } = useOverlays();

	return (
		<Modal
			isOpen={communityModal.isOpen}
			onOpenChange={communityModal.onChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Create your community
						</ModalHeader>
						<ModalBody>
							<Input
								label="Name"
								placeholder="My community"
								labelPlacement="outside"
							/>
							<Input
								label="Description"
								placeholder="This community is blah blah blah"
								labelPlacement="outside"
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={onClose}
							>
								Close
							</Button>
							<Button color="primary" onPress={onClose}>
								Create Community
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddCommunityModal;
