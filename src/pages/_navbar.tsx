import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, useSignOut } from '~/hooks';
import { ROUTES } from '~/router';

const Navbar = () => {
	const router = useRouter();
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
		<nav className="container">
			<ul>
				<li>
					<strong>
						<Link href={ROUTES.HOME}>Linkage</Link>
					</strong>
				</li>
			</ul>
			<ul>
				{!session && (
					<>
						<li>
							<Link href={ROUTES.SIGN_IN}>Sign in</Link>
						</li>
						<li>
							<Link href={ROUTES.SIGN_UP}>Sign up</Link>
						</li>
					</>
				)}
				{session && (
					<>
						<li>
							<Link href={ROUTES.PROFILE}>Profile</Link>
						</li>
						<li>
							<button onClick={handleSignOut}>Sign out</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
