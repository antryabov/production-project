import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('should return counter value', () => {
        // deep partial позволяет проигнорировать ненужные поля в стейте и взять необходимые
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        // в тестах as допустим (в продуктовом коде этого лучше не делать)
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
