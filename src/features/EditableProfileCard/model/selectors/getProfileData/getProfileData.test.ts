import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
    test('should return data', () => {
        const data = {
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
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {};
        // кастуем для DeepPartial
        expect(getProfileData(state as StateSchema)).toBe(undefined);
    });
});
