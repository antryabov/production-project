import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from 'app/providers/StoreProvider';
import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
    // редюсер берет без абстрактной any типа схемы, а динамически по названию из стейт схемы по названию достают редюсер
    // т.е. мы забираем поле из StateSchema в зависимости от того, какой редусер указан у этого поля
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
    children: ReactNode;
    reducers: ReducersList;
    // нужно ли удалять редюсер после демонтировании?
    removeAfterUnmount?: boolean
}

// компонент для удобного добавления и удаления асинхронных редюсеров через менеджер в компонент,
// чтобы не расписывать такую большую реализацию в компоненте, а просто изолируем
export function DynamicModuleLoader(props: DynamicModuleLoaderProps) {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;

    const dispatch = useAppDispatch();

    // получаем наш стор через хук
    // приводим к типу, где существует поле reducerManager
    const store = useStore() as ReduxStoreWithManager;
    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();

        // для добавления списка редусеров
        Object.entries(reducers).forEach(([name, reduce]) => {
            const mounted = mountedReducers[name as StateSchemaKey];
            // в момент монтирования компонента добавляем редюсер
            // теперь редюсер изолирован внутри модуля, так как редюсер будет добавляться через менеджер, а не через стор напрямую
            // из api экспортт редюсера удаляем
            if (!mounted) { // добавляем новый редюсер, если его нет
                store.reducerManager.add(name as StateSchemaKey, reduce); // Точно знаем, что всегда приходит ключ(название редюсера)
                // для логов, чтобы видеть, когда стейт подключился
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        // при демонтировании компоненты мы удаляем этот редюсер
        return () => {
            Object.entries(reducers).forEach(([name]) => {
                if (removeAfterUnmount) {
                    store.reducerManager.remove(name as StateSchemaKey);
                    // для логов, чтобы видеть, когда стейт очистился
                    dispatch({ type: `@DESTROY ${name} reducer` });
                }
            });
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            { children }
        </>
    );
}
