import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchNextArticlesPart } from './fetchNextArticlesPart';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// мокаем модуль
jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPart', () => {
    test('fetch next page', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPart, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toBeCalledWith({ page: 3 });
    });

    test('fetch not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPart, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test('fetch not called with loading', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPart, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
