import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesHasMore, getArticlesIsLoading, getArticlesPageNum,
} from '../../selectors/articles';
import { ArticlesPageActions } from '../../slice/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const fetchNextArticlesPart = createAsyncThunk<
    void, // получение данных
    void,
    ThunkConfig<string> // thunkApi
    >(
        'articlesPage/fetchNextArticlesPart',
        async (_, thunkAPI) => {
            const { getState, dispatch } = thunkAPI;
            const hasMore = getArticlesHasMore(getState());
            const page = getArticlesPageNum(getState());
            const isLoading = getArticlesIsLoading(getState());

            if (hasMore && !isLoading) {
                dispatch(ArticlesPageActions.setPage(page + 1));
                dispatch(fetchArticlesList({
                    page: page + 1,
                }));
            }
        },
    );
