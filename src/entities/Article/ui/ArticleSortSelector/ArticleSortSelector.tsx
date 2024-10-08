import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import Select, { SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from '../../model/types/article';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void
}
function ArticleSortSelector(props: ArticleSortSelectorProps) {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    } = props;

    const { t } = useTranslation();

    // мемоизация для того, чтобы не рендерился новый массив
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        { value: 'asc', content: t('ascending') },
        { value: 'desc', content: t('descending') },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        { value: ArticleSortField.CREATED, content: t('created') },
        { value: ArticleSortField.TITLE, content: t('title_sort') },
        { value: ArticleSortField.VIEWS, content: t('views') },
    ], [t]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                value={sort}
                options={sortFieldOptions}
                label={t('sort')}
                onChange={onChangeSort}
            />
            <Select
                className={cls.order}
                value={order}
                options={orderOptions}
                label={t('by')}
                onChange={onChangeOrder}
            />
        </div>
    );
}
export default memo(ArticleSortSelector);
