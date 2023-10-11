import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Spinner,
} from '@nextui-org/react';
import { IconMenu } from '@tabler/icons-react';
import { ThemeButton } from '~/components';
import { useSession, useSignOut } from '~/hooks';
import { useOverlays } from '~/providers';
import { ROUTES } from '~/router';

const Nav = () => {
	const { data: session, isLoading: isSessionLoading } = useSession();
	const { mutate: signOut, isLoading: isSignOutRunning } = useSignOut();
	const { drawer } = useOverlays();

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
						<Button
							isLoading={isSignOutRunning}
							onClick={handleSignOut}
						>
							Sign Out
						</Button>
					</NavbarItem>
				)}
				{!isSessionLoading && session && session.role === 'admin' && (
					<NavbarItem className="hidden xl:block">
						<Button as={Link} href={ROUTES.ADMIN}>
							Admin
						</Button>
					</NavbarItem>
				)}
				{!isSessionLoading && session && (
					<NavbarItem className="xl:hidden">
						<Button
							isIconOnly
							variant="ghost"
							onClick={drawer.open}
						>
							<IconMenu />
						</Button>
					</NavbarItem>
				)}
			</NavbarContent>
		</Navbar>
	);
};

export default Nav;
