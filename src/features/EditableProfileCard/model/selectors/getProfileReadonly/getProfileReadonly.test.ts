import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly', () => {
    test('should locked the form for edit', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true,
            },
        };
        expect(getProfileReadonly(state as StateSchema)).toBe(true);
    });
    test('should work with empty state', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {};
        // кастуем для DeepPartial
        expect(getProfileReadonly(state as StateSchema)).toBe(undefined);
    });
});
