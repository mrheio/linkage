import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Spinner,
} from '@nextui-org/react';
import { ThemeButton } from '~/components';
import { useSession } from '~/hooks';
import { ROUTES } from '~/router';

const Nav = () => {
	const { data: session, isLoading: isSessionLoading } = useSession();

	return (
		<Navbar>
			<NavbarBrand>
				<span className="font-bold text-inherit">Linkage</span>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeButton />
				</NavbarItem>
				<NavbarItem>
					{isSessionLoading && <Spinner />}

					{!isSessionLoading && !session && (
						<Button
							as={Link}
							color="primary"
							href={ROUTES.SIGN_UP}
							variant="flat"
						>
							Get Started
						</Button>
					)}

					{!isSessionLoading && session && (
						<Button
							as={Link}
							isIconOnly
							radius="full"
							href={ROUTES.PROFILE}
						>
							{session.username[0].toUpperCase()}
						</Button>
					)}
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default Nav;
