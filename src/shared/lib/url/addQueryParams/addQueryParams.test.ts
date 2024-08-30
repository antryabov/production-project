import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toBe('?test=value');
    });

    test('test with multiple param', () => {
        const params = getQueryParams({
            test: 'value',
            second: 'value',
            third: 'value',
        });
        expect(params).toBe('?test=value&second=value&third=value');
    });

    test('test with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            second: undefined,
        });
        expect(params).toBe('?test=value');
    });
});
