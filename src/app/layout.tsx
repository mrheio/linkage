import '@picocss/pico';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ROUTES } from '~/router';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Linkage',
	description: '',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<nav className="container">
					<ul>
						<li>
							<strong>Linkage</strong>
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
					</ul>
				</nav>
				<main className="container">{children}</main>
			</body>
		</html>
	);
}
