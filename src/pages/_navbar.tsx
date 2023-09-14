import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ROUTES } from '~/router';

const Navbar = () => {
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSignOut = async () => {
		setIsSuccess(false);
		await fetch('/api/auth/sign-out', { method: 'POST' });
		setIsSuccess(true);
	};

	useEffect(() => {
		if (isSuccess) {
			router.reload();
		}
	}, [isSuccess]);

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
				<li>
					<button onClick={handleSignOut}>Sign out</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
