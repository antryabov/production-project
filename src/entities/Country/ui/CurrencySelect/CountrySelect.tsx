import { useTranslation } from 'react-i18next';
import Select from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string
    value?: Country
    onChange?: (value: Country) => void
    readonly?: boolean
}

// если вынесем за пределы компорненты объект или массив, то ссылка меняться не будет при ререндере
// это удобно, если у на статичные данные
// а так, вообще нужно мемоизировать все массивы и объекты, если передаем куда-то пропсами
const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

function CountrySelect(props: CountrySelectProps) {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;
    const { t } = useTranslation('translation');

    const onChangeHandler = useCallback((value: string) => {
        // компонент родителя ожидает, что будет Country, а выбор будет в стринге(вроде можно настроить конфиг)
        // мы точно знаем, что будет Country enum
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            value={value}
            label={t('country_label')}
            options={options}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
}

export default memo(CountrySelect);
