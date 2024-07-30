import { ReactNode, useMemo, useState } from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContex,
} from '../lib/ThemeContex';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode
}

// Если есть в LS то берет ее, если нет, то ставит светлую
// приводим строку к типу Theme (as Theme)
const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

function ThemeProvider(props: ThemeProviderProps) {
    const {
        initialTheme,
        children,
    } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContex.Provider value={defaultProps}>
            {children}
        </ThemeContex.Provider>
    );
}

export default ThemeProvider;
