import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

// функция, которая возвращает AsyncThunkAction
type ActionCreatorType<Return, Arg, RejectedValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

// класс создан для удоства тестирования асинхронных thunk'ов
// указаны обобщающие типы, чтобы подходили для всех thunk'ов
export class TestAsyncThunk<Return, Arg, RejectedValue> {
    // описание типов
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator;
        // для передачи в action нужно замокать dispatch и getState
        // присваиваем обычную замоканную функцию jest'a
        // в каждом объекте функции будут уникальные
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    // асинхронная функция
    async callThunk(arg: Arg) {
        // createAsyncThunk - это action creator, который возвращает action после вызова
        const action = this.actionCreator(arg);
        // action асинхронный. dispatch и getState нужны для вызова, а возвращать будет все равно arg
        const result = await action(this.dispatch, this.getState, undefined);
        // вовращает промис
        return result;
    }
}
