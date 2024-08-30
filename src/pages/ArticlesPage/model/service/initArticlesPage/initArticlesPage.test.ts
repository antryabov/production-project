import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';

import { initArticlesPage } from './initArticlesPage';

// инициализированном стейте экшены не отрабатывают
describe('initArticlesPage', () => {
    test('inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                _inited: true,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        expect(thunk.dispatch).toBeCalledTimes(2);
    });

    test('not inited', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
                _inited: false,
            },
        });

        await thunk.callThunk(new URLSearchParams());

        expect(thunk.dispatch).toBeCalledTimes(4);
    });
});
