import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, useCallback, useMemo,
} from 'react';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void
    readonly?: boolean
}
function Select<T extends string>(props: SelectProps<T>) {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
    } = props;
    const { t } = useTranslation();

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods: Mods = {

    };

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        // по типу type guard на уровне пропсов
        onChange?.(event.target.value as T);
    }, [onChange]);

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
}

export default Select;
