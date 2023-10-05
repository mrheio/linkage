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
import { useSession, useSignOut } from '~/hooks';
import { ROUTES } from '~/router';

const Nav = () => {
	const { data: session, isLoading: isSessionLoading } = useSession();
	const {
		mutate: signOut,
		isLoading: isSignOutRunning,
		isSuccess: isSignOutSuccess,
	} = useSignOut();

	const handleSignOut = () => {
		signOut();
	};

	return (
		<Navbar>
			<NavbarBrand>
				<Link href={ROUTES.HOME}>
					<span className="font-bold text-inherit">Linkage</span>
				</Link>
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
				{!isSessionLoading && session && (
					<NavbarItem>
						<Button onClick={handleSignOut}>Sign Out</Button>
					</NavbarItem>
				)}
			</NavbarContent>
		</Navbar>
	);
};

export default Nav;
