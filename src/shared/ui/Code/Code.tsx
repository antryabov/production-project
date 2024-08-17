import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import CopyIcon from 'shared/assets/icons/copy.svg';
import cls from './Code.module.scss';
import Icon from '../Icon/Icon';
import Button, { ButtonTheme } from '../Button/Button';
import Text from '../Text/Text';

interface CodeProps {
    className?: string;
    text: string;
}
function Code(props: CodeProps) {
    const { className, text } = props;
    const [isCopy, setIsCopy] = useState(false);

    const onCopy = useCallback(() => {
        // копирование кнопки
        navigator.clipboard.writeText(text);
        setIsCopy(true);
    }, [text]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isCopy) {
            timer = setTimeout(() => {
                setIsCopy(false);
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [isCopy]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            {isCopy && <Text className={cls.copyTooltip} text="Скопировано" />}
            <Button onClick={onCopy} className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
                <Icon Svg={CopyIcon} className={cls.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
}
export default memo(Code);
