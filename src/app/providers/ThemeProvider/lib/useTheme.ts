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
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.PINK;
            break;
        case Theme.PINK:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        // навешываем тему на body для правильной работы темы и динамической замены переменных
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toogleTheme,
    };
};
