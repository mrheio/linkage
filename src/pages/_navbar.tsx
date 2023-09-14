import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

	useEffect(() => {
		if (isSignOutSuccess) {
			router.reload();
		}
	}, [isSignOutSuccess]);

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
				<li>
					<Link href={ROUTES.SIGN_IN}>Sign in</Link>
				</li>
				<li>
					<Link href={ROUTES.SIGN_UP}>Sign up</Link>
				</li>
				<li>
					<Link href={ROUTES.PROFILE}>Profile</Link>
				</li>
				{session && (
					<li>
						<button onClick={handleSignOut}>Sign out</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
