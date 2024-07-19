type Mods = Record<string, boolean | string>;

// кастомная функция, как в библиотеки classnames
export function classNames(
    cls: string,
    mods: Mods = {},
    additional: string[] = [],
): string {
    return [
        cls,
        // спредим все из доп классов, если есть(для этого фильтер и в нем приведение к булеан)
        // если есть, то true
        // строку приводим к булеан значению
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' '); // переводим в строку с пробелами между классами
}
