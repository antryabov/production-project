import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

// создание стора сделаем через функцию. Нужно для того, чтобы использовать в изолированных компонентах
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    // ReducersMapObject - тип для корневого редюсера в сторе
    const rootReducer: ReducersMapObject<StateSchema> = {
        // добавлять asyncReducers лучше в начале
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore<StateSchema>({
        // передаем редюсеры из менеджера
        reducer: reducerManager.reduce,
        preloadedState: initialState,
        devTools: __IS_DEV__,
    });

    // добавляем новое поле в стор
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
