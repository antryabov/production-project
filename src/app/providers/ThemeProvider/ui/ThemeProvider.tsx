import { ReactNode, useMemo, useState } from 'react';
import {
	LOCAL_STORAGE_THEME_KEY,
	Theme,
	ThemeContex
} from '../lib/ThemeContex';

const defaultTheme = // приводим строку к типу Theme
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(defaultTheme); // Если есть в LS то берет ее, если нет, то ставит светлую

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme
		}),
		[theme]
	);

	return (
		<ThemeContex.Provider value={defaultProps}>
			{children}
		</ThemeContex.Provider>
	);
}

export default ThemeProvider;
