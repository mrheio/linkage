import {
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from '@nextui-org/react';
import { ReactNode } from 'react';

type DrawerProps = Partial<ReturnType<typeof useDisclosure>> & {
	position?: 'left' | 'right';
	children: ReactNode;
};

const Drawer = (props: DrawerProps) => {
	const { children, isOpen, onOpenChange, position = 'right' } = props;

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size="full"
			className={`fixed ${position}-0 w-[60%] max-w-md`}
			motionProps={{
				variants: {
					enter: {
						x: 0,
						opacity: 1,
						transition: {
							duration: 0.3,
							ease: 'easeOut',
						},
					},
					exit: {
						x: 20,
						opacity: 0,
						transition: {
							duration: 0.2,
							ease: 'easeIn',
						},
					},
				},
			}}
		>
			<ModalContent>
				{(onclose) => (
					<ModalBody className="my-12">{children}</ModalBody>
				)}
			</ModalContent>
		</Modal>
	);
};

export default Drawer;
