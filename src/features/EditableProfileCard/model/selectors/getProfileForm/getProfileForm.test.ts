import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
    test('should return form', () => {
        const form = {
            username: 'admin',
            age: 27,
            country: Country.Armenia,
            lastname: 'Ivanov',
            first: 'Ivan',
            city: 'Moscow',
            currency: Currency.RUB,
        };
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {
            profile: {
                form,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });
    test('should work with empty state', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {};
        // кастуем для DeepPartial
        expect(getProfileForm(state as StateSchema)).toBe(undefined);
    });
});
