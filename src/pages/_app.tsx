import { QueryClient } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Nav from './_navbar';
import Providers from './_providers';
import './globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Linkage</title>
			</Head>
			<Providers>
				<Nav />
				<main className="mx-auto h-full min-h-screen max-w-5xl p-6 xl:p-0 xl:py-6">
					<Component {...pageProps} />
				</main>
			</Providers>
		</>
	);
}
