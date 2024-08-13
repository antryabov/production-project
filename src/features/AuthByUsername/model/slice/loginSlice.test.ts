import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: '123',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin')))
            .toEqual({ username: 'admin' });
    });
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: 'admin',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('123')))
            .toEqual({ password: '123' });
    });
    test('test login fulfilled', () => {
        const state: DeepPartial<LoginSchema> = {
            isLoading: true,
        };
        // редюсер принимает state и action
        expect(loginReducer(
            state as LoginSchema,
            // в кейсах экстра редюсеров все кейсы - экшены
            // здесь fulfilled не принимает аргументы
            // когда успешно выполнился async thunk, то должен вернуть данные профиль
            loginByUsername.fulfilled,
        )).toEqual({
            isLoading: false,
        });
    });
});
