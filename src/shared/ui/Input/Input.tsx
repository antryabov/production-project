import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

// из за конфликта типов(в инпуте уже есть value и onChange), нужно исключить дефолтные пропсы из инпута
// потому то onChange стандартный принимает event, а кастомный onChange принимает value
// тип Omit позволяет забрать все пропсы, но исключить те, которые ненужны(вторым аргументом)
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    type?: string;
    onChange?: (value: string) => void;
    placeholder?: string,
    autofocus?: boolean,
    readonly?: boolean
}

function Input(props: InputProps) {
    const {
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        autofocus,
        readonly,
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const isCaretVisible = isFocused && !readonly;

    useEffect(() => {
        // компонент монтируется в самом начале и за это время фокус сбросится
        // для этого мы делали компонент модального окна лениво
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        onChange?.(event.target.value);
        // для передвижения каретки
        setCaretPosition(event.target.value.length);
    };
    // выход из фокуса onBlur
    const onBlur = () => {
        setIsFocused(false);
    };
    // фокусит onFocus
    const onFocus = () => {
        setIsFocused(true);
    };

    // для того, чтобы правильно передвигать каретку на выделенный участок (range и selection - learn js почитать)
    const onSelect = (event: any) => {
        // при нажатии на этом месте появляется каретка или равно 0, если текста нет
        setCaretPosition(event?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    value={value}
                    type={type}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span
                        className={cls.caret}
                        // движение каретки
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(Input);
