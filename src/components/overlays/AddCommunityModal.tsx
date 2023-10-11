import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCommunity, useSession } from '~/hooks';
import { useOverlays } from '~/providers';
import { addCommunitySchema } from '~/schemas';

const AddCommunityModal = () => {
	const { data: session } = useSession();
	const { communityModal } = useOverlays();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { name: '', description: '' },
		resolver: zodResolver(addCommunitySchema.omit({ owner_id: true })),
	});
	const {
		mutate: createCommunity,
		isLoading: isCreateCommunityRunning,
		isSuccess: isCreateCommunitySucess,
		error,
	} = useCreateCommunity();

	const handleCreateCommunity = handleSubmit((data) => {
		createCommunity({ uid: session.id, data });
	});

	useEffect(() => {
		if (isCreateCommunitySucess) {
			communityModal.close();
		}
	}, [isCreateCommunitySucess]);

	return (
		<Modal
			isOpen={communityModal.isOpen}
			onOpenChange={communityModal.onChange}
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={handleCreateCommunity}>
						<ModalHeader className="flex flex-col gap-1">
							Create your community
						</ModalHeader>
						<ModalBody>
							<Input
								label="Name"
								placeholder="My community"
								labelPlacement="outside"
								isInvalid={!!errors.name}
								errorMessage={errors.name?.message}
								{...register('name')}
							/>
							<Input
								label="Description"
								placeholder="This community is blah blah blah"
								labelPlacement="outside"
								isInvalid={!!errors.description}
								errorMessage={errors.description?.message}
								{...register('description')}
							/>
							<p className="font-semibold text-danger-400">
								{(error as any)?.message}
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="flat"
								type="button"
								onPress={onClose}
							>
								Close
							</Button>
							<Button
								color="primary"
								type="submit"
								isLoading={isCreateCommunityRunning}
							>
								Create Community
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddCommunityModal;
