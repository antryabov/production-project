import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page';
import { useSearchParams } from 'react-router-dom';
import { initArticlesPage } from '../../model/service/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPart } from '../../model/service/fetchNextArticlesPart/fetchNextArticlesPart';
import {
    getArticlesError, getArticlesIsLoading, getArticlesView,
} from '../../model/selectors/articles';
import { ArticlesPageActions, ArticlesPageReducer, getArticles } from '../../model/slice/ArticlePageSlice';
import cls from './ArticlesPage.module.scss';
import ArticlesPageFilters from '../ArticlesPageFilters/ArticlesPageFilters';

interface ArticlesPageProps {
    className?: string;
}

const initialReducer: ReducersList = {
    articlesPage: ArticlesPageReducer,
};

function ArticlesPage(props: ArticlesPageProps) {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    // cелектор для адаптера
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const view = useSelector(getArticlesView);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPart());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={initialReducer} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
}

export default memo(ArticlesPage);
