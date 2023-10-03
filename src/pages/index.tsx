import { useTheme } from '~/providers';

export default function Home() {
	const [theme, toggleTheme] = useTheme();

	return (
		<h1>
			Home page <button onClick={toggleTheme}>Toggle Theme</button>
		</h1>
	);
}
