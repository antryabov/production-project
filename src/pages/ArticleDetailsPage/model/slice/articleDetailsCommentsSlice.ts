import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
});

// селекторы
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const initialState = commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
});

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsComments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                // только добавить, а данные нормализует сам адаптер
                commentsAdapter.setAll(state, action.payload);
                state.isLoading = false;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const {
    actions: articleDetailsCommentsActions,
    reducer: ArticleDetailsCommentsReducer,
} = articleDetailsCommentsSlice;
