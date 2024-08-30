import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { getArticlesInited } from '../../selectors/articles';
import { ArticlesPageActions } from '../../slice/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const initArticlesPage = createAsyncThunk<
    void, // получение данных
    URLSearchParams,
    ThunkConfig<string> // thunkApi
    >(
        'articlesPage/initArticlesPage',
        async (searchParams, thunkAPI) => {
            const { getState, dispatch } = thunkAPI;

            const inited = getArticlesInited(getState());

            if (!inited) {
                searchParams.forEach((value, key) => {
                    switch (key) {
                    case 'search':
                        dispatch(ArticlesPageActions.setSearch(value));
                        break;
                    case 'sort':
                        dispatch(ArticlesPageActions.setSort(value as ArticleSortField));
                        break;
                    case 'type':
                        dispatch(ArticlesPageActions.setType(value as ArticleType));
                        break;
                    default:
                        dispatch(ArticlesPageActions.setOrder(value as SortOrder));
                        break;
                    }
                });

                dispatch(ArticlesPageActions.initState());
                dispatch(fetchArticlesList({}));
            }
        },
    );
