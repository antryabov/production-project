import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const fetchArticleRecommendations = createAsyncThunk<
    Article[], // получение данных
    void,
    ThunkConfig<string> // thunkApi
    >(
        'articlesDetailsPage/fetchArticleRecommendations',
        async (props, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.get<Article[]>('/articles/', {
                    params: {
                        _limit: 4,
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
