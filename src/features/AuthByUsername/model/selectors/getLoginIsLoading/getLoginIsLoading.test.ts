import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
    test('should return true', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateSchema)).toBe(true);
    });
    test('should work with empty state', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {};
        // кастуем для DeepPartial
        expect(getLoginIsLoading(state as StateSchema)).toBe(false);
    });
});
