import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

const ThemeContext = createContext<[string | null, () => void] | null>(null);

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
	const [theme, setTheme] = useState<string | null>(null);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
		localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
	};

	useEffect(() => {
		const root = window.document.documentElement;
		const documentTheme = root.className;
		setTheme(documentTheme);
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		const documentTheme = root.className;
		if (theme && theme !== documentTheme) {
			root.className = theme;
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={[theme, toggleTheme]}>
			{children}
		</ThemeContext.Provider>
	);
};
