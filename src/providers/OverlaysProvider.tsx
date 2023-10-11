import { useDisclosure } from '@nextui-org/react';
import { ReactNode, createContext, useContext, useState } from 'react';
import { Community } from '~/types';

type OverlayControllerProps = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	onChange: (isBoolean: boolean) => void;
};

type OverlaysContextProps = {
	drawer: OverlayControllerProps;
	communityModal: OverlayControllerProps;
	communityDetailsModal: Omit<OverlayControllerProps, 'open'> & {
		open: (c: Community) => void;
		community: Community | null;
	};
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
	const communityDetailsModalState = useDisclosure();
	const [community, setCommunity] = useState<Community | null>(null);

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
				communityDetailsModal: {
					isOpen: communityDetailsModalState.isOpen,
					open: (c: Community) => {
						communityDetailsModalState.onOpen();
						setCommunity(c);
					},
					close: communityDetailsModalState.onClose,
					onChange: communityDetailsModalState.onOpenChange,
					community,
				},
			}}
		>
			{children}
		</OverlaysContext.Provider>
	);
};
