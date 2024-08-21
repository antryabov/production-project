import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfileSchema, ValidateProfileError } from '../types/profileSchema';
import { profileAction, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

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

describe('profileSlice', () => {
    test('set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        // редюсер принимает state и action
        expect(profileReducer(
            state as ProfileSchema,
            profileAction.setReadonly(true),
        )).toEqual({ readonly: true });
    });

    test('set cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: {
                username: '',
            },
        };
        // редюсер принимает state и action
        expect(profileReducer(
            state as ProfileSchema,
            profileAction.cancelEdit(),
        )).toEqual({
            readonly: true,
            form: data,
            validateErrors: undefined,
            data,
        });
    });

    test('update profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: {
                username: '123',
            },
        };
        // редюсер принимает state и action
        expect(profileReducer(
            state as ProfileSchema,
            profileAction.updateProfile({ username: '123123' }),
        )).toEqual({
            form: {
                username: '123123',
            },
        });
    });

    // ТЕСТ ЭКСТРА РЕДЮСЕРА
    // тестируются точно так же, как и обычные редюсеры
    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.INCORRECT_AGE],
        };
        // редюсер принимает state и action
        expect(profileReducer(
            state as ProfileSchema,
            // в кейсах экстра редюсеров все кейсы - экшены
            updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: undefined,
            form: undefined,
            readonly: false,
            isLoading: true,
            validateErrors: undefined,
        };
        // редюсер принимает state и action
        expect(profileReducer(
            state as ProfileSchema,
            // в кейсах экстра редюсеров все кейсы - экшены
            // fulfilled ожидает аргументы (есть кейсы, где не нужны аргументы)
            // когда успешно выполнился async thunk, то должен вернуть данные профиль
            updateProfileData.fulfilled(data, ''),
        )).toEqual({
            data,
            form: data,
            readonly: true,
            isLoading: false,
            validateErrors: undefined,
        });
    });
});
