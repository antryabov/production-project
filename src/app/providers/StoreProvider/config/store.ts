import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

// создание стора сделаем через функцию. Нужно для того, чтобы использовать в изолированных компонентах
export function createReduxStore(initialState?: StateSchema) {
    // ReducersMapObject - тип для корневого редюсера в сторе
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducer,
        preloadedState: initialState,
        devTools: __IS_DEV__,
    });
}
