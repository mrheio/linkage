import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

const DEFAULT_THEME = 'light';

const ThemeContext = createContext<[string, () => void] | null>(null);

export const useTheme = () => {
	const x = useContext(ThemeContext);

	if (x === null) {
		throw new Error(
			'useTheme must be called inside a children of ThemeProvider',
		);
	}

	return x;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState(DEFAULT_THEME);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
		localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');

		if (storedTheme) {
			setTheme(storedTheme);
		}
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(theme === 'dark' ? 'light' : 'dark');
		root.classList.add(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={[theme, toggleTheme]}>
			{children}
		</ThemeContext.Provider>
	);
};
