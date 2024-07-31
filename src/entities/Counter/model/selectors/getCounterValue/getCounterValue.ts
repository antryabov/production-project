import { createSelector } from '@reduxjs/toolkit';
import { CounterSchema } from '../../types/CounterSchema';
import { getCounter } from '../getCounter/getCounter';

// reselect помогает переиспользовать общий селектор и взять нужный. Можно произвести расчёты из двух селекторов, к примеру.

export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value,
);
// особенностью reselecta является то, что он использует мемоизацию, если будут какие-то расчёты
// то он он мемоизирует результат, а пересчитает его, когда изменится значение
