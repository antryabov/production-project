import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum TextAlign {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string
    theme?: TextTheme
    align?: TextAlign
}
function Text(props: TextProps) {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
    } = props;
    const { t } = useTranslation();

    const mods: Mods = {
        [cls[theme]]: theme === TextTheme.ERROR,
    };

    return (
        <div className={classNames(cls.Text, mods, [className, cls[align]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
}

export default memo(Text);
