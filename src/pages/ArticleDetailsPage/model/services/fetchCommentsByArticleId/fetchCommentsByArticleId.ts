import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[], // получение данных
    string | undefined, // arg - id
    ThunkConfig<string> // thunkApi
    >(
        'articleDetailsComments/fetchCommentsByArticleId',
        async (articleId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<Comment[]>('/comments', {
                    params: {
                        articleId,
                        // user это вырезанное название поля из userId в комментах(db json)
                        // Если бы в комментах было написано поле usersId, то передавали бы в _expand уже users
                        // вырезает Id и ищет подходящий endpoint со словом user (в нашем случае users со списком пользователей)
                        _expand: 'user',
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                return rejectWithValue('error');
            }
        },
    );
