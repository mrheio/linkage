import '@picocss/pico';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from './_navbar';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Linkage</title>
			</Head>
			<Navbar />
			<main className="container">
				<Component {...pageProps} />
			</main>
		</>
	);
}
