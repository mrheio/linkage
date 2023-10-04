import { Button } from '@nextui-org/react';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { useTheme } from '~/providers';

const ThemeButton = () => {
	const [theme, toggleTheme] = useTheme();

	return (
		<Button isIconOnly onClick={toggleTheme} variant="light">
			{theme === 'light' ? <IconMoonFilled /> : <IconSunFilled />}
		</Button>
	);
};

export default ThemeButton;
