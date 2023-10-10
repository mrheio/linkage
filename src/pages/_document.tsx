import { Head, Html, Main, NextScript } from 'next/document';

function setInitialColorMode() {
	function getInitialColorMode() {
		const preference = window.localStorage.getItem('theme');
		const hasExplicitPreference = typeof preference === 'string';

		if (hasExplicitPreference) {
			return preference;
		}

		const mediaQuery = '(prefers-color-scheme: dark)';
		const mql = window.matchMedia(mediaQuery);
		const hasImplicitPreference = typeof mql.matches === 'boolean';

		if (hasImplicitPreference) {
			return mql.matches ? 'dark' : 'light';
		}

		return 'light';
	}

	const colorMode = getInitialColorMode();
	const root = document.documentElement;
	root.className = colorMode;

	return;
}

const blockingSetInitialColorMode = `(function() {
	  ${setInitialColorMode.toString()}
	  setInitialColorMode();
  })()
  `;

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
			</Head>
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: blockingSetInitialColorMode,
					}}
				/>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
