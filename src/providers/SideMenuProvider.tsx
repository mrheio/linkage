import { useDisclosure } from '@nextui-org/react';
import { ReactNode, createContext, useContext } from 'react';

type OverlayControllerProps = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	onChange: (isBoolean: boolean) => void;
};

type OverlaysContextProps = {
	drawer: OverlayControllerProps;
	communityModal: OverlayControllerProps;
};

const OverlaysContext = createContext<OverlaysContextProps | null>(null);

export const useOverlays = () => {
	const x = useContext(OverlaysContext);

	if (x === null) {
		throw new Error(
			'useSideMenu must be call inside a children of SideMenuProvider',
		);
	}

	return x;
};

export const OverlaysProvider = ({ children }: { children: ReactNode }) => {
	const drawerState = useDisclosure();
	const communityModalState = useDisclosure();

	return (
		<OverlaysContext.Provider
			value={{
				drawer: {
					isOpen: drawerState.isOpen,
					open: drawerState.onOpen,
					close: drawerState.onClose,
					onChange: drawerState.onOpenChange,
				},
				communityModal: {
					isOpen: communityModalState.isOpen,
					open: communityModalState.onOpen,
					close: communityModalState.onClose,
					onChange: communityModalState.onOpenChange,
				},
			}}
		>
			{children}
		</OverlaysContext.Provider>
	);
};
