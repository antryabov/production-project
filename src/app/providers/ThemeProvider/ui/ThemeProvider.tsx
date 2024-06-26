import { ReactNode, useMemo, useState } from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContex,
} from '../lib/ThemeContex';

// Если есть в LS то берет ее, если нет, то ставит светлую
// приводим строку к типу Theme (as Theme)
const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

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
