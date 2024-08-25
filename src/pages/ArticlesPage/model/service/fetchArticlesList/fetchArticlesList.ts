import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesLimit } from '../../selectors/articles';

interface FetchArticlesListProps {
    page?: number;
}

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const fetchArticlesList = createAsyncThunk<
    Article[], // получение данных
    FetchArticlesListProps,
    ThunkConfig<string> // thunkApi
    >(
        'articlesPage/fetchArticlesList',
        async (props, thunkAPI) => {
            const { extra, rejectWithValue, getState } = thunkAPI;

            const { page = 1 } = props;

            const limit = getArticlesLimit(getState());

            try {
                const response = await extra.api.get<Article[]>('/articles/', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                console.log(error);
                return rejectWithValue('error');
            }
        },
    );
