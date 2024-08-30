import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { SortOrder } from 'shared/types';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../service/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

// селекторы для адаптера
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.TILE,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
});

export const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        // пагинация
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        // фильтрация
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            // кастуем, потому что сторадж умеет хранить только строки
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            // пагинация
            state.limit = view === ArticleView.LIST ? 4 : 11;

            // для первоначальной загрузки данных в ActiclesPage
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    // для очистки массива при подгрузке новых данных
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                // если прилетел массив с длиной 5, а лимит 11, то логично, что данных больше нет и лишний запрос делать не надо
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    // переписывает массив, если используем фильтрацию
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    // addMany добавляет данные в конец
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const {
    actions: ArticlesPageActions,
    reducer: ArticlesPageReducer,
} = articlesPageSlice;
