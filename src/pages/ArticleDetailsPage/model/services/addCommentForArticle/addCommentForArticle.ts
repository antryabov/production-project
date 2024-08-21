import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { Comment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI;

        // собираем информацию о пользователе, который оставил комментарий
        const userData = getUserAuthData(getState());
        // берем id статьи
        const article = getArticleDetailsData(getState());

        // для подстраховки, чтобы не использовали там, где не надо
        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        const newComment = {
            text,
            articleId: article?.id,
            userId: userData.id,
        };

        try {
            const response = await extra.api.post<Comment>('/comments', newComment);

            if (!response.data) {
                throw new Error();
            }
            console.log(response.data);
            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
