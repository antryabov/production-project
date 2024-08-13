import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../types/profileSchema';

describe('getProfileValidateErrors', () => {
    test('should return errors validation form', () => {
        const errors = [ValidateProfileError.INCORRECT_AGE, ValidateProfileError.INCORRECT_USER_DATA];
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });
    test('should work with empty state', () => {
        // DeepPartial тип, который позволяет вытаскивать только нужные поля
        const state: DeepPartial<StateSchema> = {};
        // кастуем для DeepPartial
        expect(getProfileValidateErrors(state as StateSchema)).toBe(undefined);
    });
});
