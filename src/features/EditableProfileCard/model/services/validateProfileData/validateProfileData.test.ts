import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/profileSchema';

const data = {
    username: 'admin',
    age: 27,
    country: Country.Armenia,
    lastname: 'Ivanov',
    first: 'Ivan',
    city: 'Moscow',
    currency: Currency.RUB,
};

describe('validateProfileData', () => {
    test('not errors', () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('without fields first and last name', () => {
        const result = validateProfileData({
            ...data,
            first: '',
            lastname: '',
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('incorrect age', () => {
        const result = validateProfileData({
            ...data,
            age: undefined,
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('incorrect city', () => {
        const result = validateProfileData({
            ...data,
            city: '',
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });

    test('incorrect all', () => {
        const result = validateProfileData({
            ...data,
            city: '',
            age: undefined,
            first: '',
            lastname: '',
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });
});
