import {
    CombinedState, configureStore, getDefaultMiddleware, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { scrollSaveReducer } from 'features/ScrollSave';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

// создание стора сделаем через функцию. Нужно для того, чтобы использовать в изолированных компонентах
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    // ReducersMapObject - тип для корневого редюсера в сторе
    const rootReducer: ReducersMapObject<StateSchema> = {
        //  пропс asyncReducers нужен для стори кейсов, чтобы прокинуть асинхронное состояние
        // добавлять asyncReducers лучше в начале
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        scrollSave: scrollSaveReducer,
    };

    // менеджер принимает рутовый редюсер
    const reducerManager = createReducerManager(rootReducer);

    // вынесли отдельно extra аргументы из за проблемы с типами
    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        // передаем редюсеры из менеджера
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        devTools: __IS_DEV__,
        // миддлварена для того, чтобы было удобно делать запросы на сервер
        // не нужно больше прописывать полный адрес, а только эндпоинт
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    // добавляем новое поле в стор
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// сначала возвращаем тип для стора и забираем у него тип поля dispatch
// используем дженерик для dispatch в хуке useAppDispatch
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
