import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchArticlesList } from '../../model/service/fetchArticlesList/fetchArticlesList';
import { getArticlesError, getArticlesIsLoading, getArticlesView } from '../../model/selectors/articles';
import { ArticlesPageActions, ArticlesPageReducer, getArticles } from '../../model/slice/ArticlePageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const initialReducer: ReducersList = {
    articlesPage: ArticlesPageReducer,
};

function ArticlesPage(props: ArticlesPageProps) {
    const { className } = props;
    const dispatch = useAppDispatch();
    // cелектор для адаптера
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const error = useSelector(getArticlesError);
    const view = useSelector(getArticlesView);

    const onChangeView = useCallback((newView: ArticleView) => {
        dispatch(ArticlesPageActions.setView(newView));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(ArticlesPageActions.initState());
    });

    return (
        <DynamicModuleLoader reducers={initialReducer}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
}

export default memo(ArticlesPage);
