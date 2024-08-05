import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

// мокаем axios
jest.mock('axios');

// мокаем внутренние поля с помощью mocked для доступа, например, поле post, чтобы замокать ответ
const mockedAxios = jest.mocked(axios, true);

// loginByUsername createAsyncThunk, который возвращает AsyncThunk(action)
describe('loginByUsername', () => {
    /*  let dispatch: Dispatch;
    let getState: () => StateSchema;

    // будет мокать перед каждым тестом
    beforeEach(() => {
        // для передачи в action нужно замокать dispatch и getState
        // присваиваем обычную замоканную функцию jest'a
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('success login', async () => {
        const userValue = {
            id: '1',
            username: 'admin',
            password: '123',

        };
        // замокали значения (ответ от сервера)
        mockedAxios.post.mockReturnValue(Promise.resolve({
            // axios возвращает данные в поле data
            data: userValue,
        }));
        // createAsyncThunk - это action creator, который возвращает action после вызова
        const action = loginByUsername(userValue);
        // action является асинхронным
        const result = await action(dispatch, getState, undefined);

        // вызвался dispatch с нужным аргументом и данными пользователя(userValue), а не с чем-либо еще
        expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        // вызвался хоть раз
        expect(mockedAxios.post).toHaveBeenCalled();
        // все вызовы dispatch
        expect(dispatch).toHaveBeenCalledTimes(3);
        // пришел статус fulfilled
        expect(result.meta.requestStatus).toBe('fulfilled');
        // возвращаются данные о пользователе
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const action = loginByUsername({ username: '123', password: '123' });
        const result = await action(dispatch, getState, undefined);

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        // вернется имя ошибки в случае rejected
        expect(result.payload).toBe('error');
    }); */

    test('success login', async () => {
        const userValue = {
            id: '1',
            username: 'admin',
            password: '123',

        };
        mockedAxios.post.mockReturnValue(Promise.resolve({
            data: userValue,
        }));

        const thunk = new TestAsyncThunk(loginByUsername);
        // callThunk асинхронная функция
        const result = await thunk.callThunk(userValue);
        // будет возможность запускать thunk много раз, если будет какой-то изощренный кейс
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        // callThunk асинхронная функция
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        // вернется имя ошибки в случае rejected
        expect(result.payload).toBe('error');
    });
});
