import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

// создание стора сделаем через функцию. Нужно для того, чтобы использовать в изолированных компонентах
export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        preloadedState: initialState,
        devTools: __IS_DEV__,
    });
}
