import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticleById } from './fetchArticleById';

const data = {
    id: '1',
    title: 'JS',
};

describe('fetchArticleById', () => {
    test('fetch article', async () => {
        // абстракция для удобства использования асинхронных thunk'ах
        const thunk = new TestAsyncThunk(fetchArticleById);
        // замоканные значения резолвим (имитация ответа с сервера)
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        // callThunk асинхронная функция
        const result = await thunk.callThunk(data.id);
        // будет возможность запускать thunk много раз, если будет какой-то изощренный кейс
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error fetch data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(data.id);

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
