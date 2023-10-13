import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import Nav from './_navbar';
import Overlays from './_overlays';
import Providers from './_providers';
import './globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<title>Linkage</title>
			</Head>
			<Providers>
				<Nav />
				<main className="mx-auto min-h-screen max-w-5xl p-6 xl:p-0 xl:py-6">
					{getLayout(<Component {...pageProps} />)}
				</main>
				<Overlays />
			</Providers>
		</>
	);
}
