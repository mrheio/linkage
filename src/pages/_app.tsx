import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '~/providers';
import Nav from './_navbar';
import './globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Linkage</title>
			</Head>
			<NextUIProvider>
				<ThemeProvider>
					<QueryClientProvider client={queryClient}>
						<Nav />
						<main className="min-h-screen max-w-5xl mx-auto">
							<Component {...pageProps} />
						</main>
					</QueryClientProvider>
				</ThemeProvider>
			</NextUIProvider>
		</>
	);
}
