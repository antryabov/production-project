import { useTranslation } from 'react-i18next';
import Select from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readonly?: boolean
}

// если вынесем за пределы компорненты объект или массив, то ссылка меняться не будет при ререндере
// а так, вообще нужно мемоизировать все массивы и объекты, если передаем куда-то пропсами
const options = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

function CurrencySelect(props: CurrencySelectProps) {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;
    const { t } = useTranslation('translation');

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            value={value}
            label={t('currency_label')}
            options={options}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
}

export default memo(CurrencySelect);
