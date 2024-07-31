import { useContext } from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContex,
    ThemeContextProps,
} from './ThemeContex';

interface UseThemeResult {
	toogleTheme: () => void;
	theme: Theme;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContex);

    const toogleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme(newTheme);
        // навешываем тему на body для правильной работы темы и динамической замены переменных
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme,
        toogleTheme,
    };
};
