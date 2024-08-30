import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import Tabs, { TabsItem } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article';
import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (value: ArticleType) => void
}
function ArticleTypeTabs(props: ArticleTypeTabsProps) {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabsItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('all'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('economics'),
        },
        {
            value: ArticleType.IT,
            content: t('IT'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('science'),
        },
    ], [t]);

    const onTabClick = useCallback((tab: TabsItem) => {
        onChangeType(tab.value as ArticleType);
    }, [onChangeType]);

    return (
        <Tabs
            className={classNames(cls.ArticleTypeTabs, {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
        />
    );
}
export default memo(ArticleTypeTabs);
