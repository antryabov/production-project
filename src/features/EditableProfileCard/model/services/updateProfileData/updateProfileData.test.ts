import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/profileSchema';

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

describe('updateProfileData', () => {
    test('update data user', async () => {
        // абстракция для удобства использования асинхронных thunk'ах
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        // что должен вернуть вызов async thunk
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        // callThunk асинхронная функция
        const result = await thunk.callThunk();
        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error server', async () => {
        // ошибка сервера, когда передаем данные, но нет ответа
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('error not data', async () => {
        // ошибка нет данных
        const thunk = new TestAsyncThunk(updateProfileData);
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.NO_DATA]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {
                    ...data,
                    lastname: '',
                },
            },
        });
        // здесб мок не нужен, потому что ошибка на уровне валидации
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
});
