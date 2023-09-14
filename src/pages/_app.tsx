import '@picocss/pico';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from './_navbar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Linkage</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main className="container">
					<Component {...pageProps} />
				</main>
			</QueryClientProvider>
		</>
	);
}
