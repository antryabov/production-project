import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

// функция, которая возвращает AsyncThunkAction
type ActionCreatorType<Return, Arg, RejectedValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

// мокаем axios
jest.mock('axios');
// мокаем внутренние поля с помощью mocked для доступа, например, поле post, чтобы замокать ответ
const mockedAxios = jest.mocked(axios, true);

// класс создан для удоства тестирования асинхронных thunk'ов
// указаны обобщающие типы, чтобы подходили для всех thunk'ов
export class TestAsyncThunk<Return, Arg, RejectedValue> {
    // описание типов
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.MockedFn<any>;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        // сюда добавляем asyncThunk, к примеру, loginByUsername
        this.actionCreator = actionCreator;
        // для передачи в action нужно замокать dispatch и getState
        // присваиваем обычную замоканную функцию jest'a
        // в каждом объекте функции будут уникальные
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.navigate = jest.fn();
        this.api = mockedAxios;
    }

    // асинхронная функция
    async callThunk(arg: Arg) {
        // createAsyncThunk - это action creator, который возвращает action после вызова
        const action = this.actionCreator(arg);
        // action асинхронный. dispatch и getState нужны для вызова, а возвращать будет все равно arg
        const result = await action(
            this.dispatch,
            this.getState,
            // для extra(в сторе есть middleware и там поле thunk), потому что добавили api axios и navigate для Async thunk
            {
                api: this.api,
                navigate: this.navigate,
            },
        ); // this.api для extra reducers
        // вовращает промис
        return result;
    }
}
