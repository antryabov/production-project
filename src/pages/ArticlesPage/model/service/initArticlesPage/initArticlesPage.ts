import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesInited } from '../../selectors/articles';
import { ArticlesPageActions } from '../../slice/ArticlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const initArticlesPage = createAsyncThunk<
    void, // получение данных
    void,
    ThunkConfig<string> // thunkApi
    >(
        'articlesPage/initArticlesPage',
        async (_, thunkAPI) => {
            const { getState, dispatch } = thunkAPI;

            const inited = getArticlesInited(getState());

            if (!inited) {
                dispatch(ArticlesPageActions.initState());
                dispatch(fetchArticlesList({
                    page: 1,
                }));
            }
        },
    );
