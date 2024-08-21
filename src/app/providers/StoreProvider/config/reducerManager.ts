import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// принимает список корневых редюсеров
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers };
    let combinedReducer = combineReducers(reducers);
    let keysToRemove: Array<StateSchemaKey> = [];

    return {
        getReducerMap: () => reducers,
        // принимаем на вход любой экшн
        reduce: (state: StateSchema, action: AnyAction) => {
            // если в массиве на удаление есть какие-то ключи редюсеров, то из стейта удаляем эти редюсеры
            if (keysToRemove.length > 0) {
                // спредим стейт
                state = { ...state };
                // и удаляем редюсеры из стейта по ключам, которые есть в массиве на удаление
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                // очищаем массив после удаления
                keysToRemove = [];
            }
            // возвращает оставшийся редюсеры
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            // для удаления редюсера
            delete reducers[key];
            // ключ на удаление редюсера из стейта
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
