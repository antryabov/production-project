import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    ArticleSortField, ArticleSortSelector, ArticleTypeTabs, ArticleView, ArticleViewSelector,
} from 'entities/Article';
import { Card } from 'shared/ui/Card/Card';
import Input from 'shared/ui/Input/Input';

import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleType } from 'entities/Article/model/types/article';
import { fetchArticlesList } from '../../model/service/fetchArticlesList/fetchArticlesList';
import cls from './ArticlesPageFilters.module.scss';
import {
    getArticlesOrder, getArticlesSearch, getArticlesSort, getArticlesType, getArticlesView,
} from '../../model/selectors/articles';
import { ArticlesPageActions } from '../../model/slice/ArticlePageSlice';

interface ArticlesPageFiltersProps {
    className?: string;
}

function ArticlesPageFilters(props: ArticlesPageFiltersProps) {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesView);
    const order = useSelector(getArticlesOrder);
    const sort = useSelector(getArticlesSort);
    const search = useSelector(getArticlesSearch);
    const type = useSelector(getArticlesType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    // для поисковой строки
    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((newView: ArticleView) => {
        dispatch(ArticlesPageActions.setView(newView));
        dispatch(ArticlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(ArticlesPageActions.setOrder(newOrder));
        dispatch(ArticlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(ArticlesPageActions.setSort(newSort));
        dispatch(ArticlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(ArticlesPageActions.setSearch(search));
        dispatch(ArticlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(ArticlesPageActions.setType(value));
        dispatch(ArticlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('search')}
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
            />
        </div>
    );
}
export default memo(ArticlesPageFilters);
