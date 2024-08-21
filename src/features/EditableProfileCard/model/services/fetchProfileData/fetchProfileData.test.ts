import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

const data = {
    id: '1',
    username: 'admin',
    age: 27,
    country: Country.Armenia,
    lastname: 'Ivanov',
    first: 'Ivan',
    city: 'Moscow',
    currency: Currency.RUB,
};

describe('fetchProfileData', () => {
    test('fetch data user', async () => {
        // абстракция для удобства использования асинхронных thunk'ах
        const thunk = new TestAsyncThunk(fetchProfileData);
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
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(data.id);

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
