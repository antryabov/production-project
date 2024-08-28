import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: ReactNode;
    // Приводим к DeepPartial
    initialState?: DeepPartial<StateSchema>,
    // подгрузка асинхронных редусеров для сторибука
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export function StoreProvider(props: StoreProviderProps) {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    // DELETE: навигейт из стора убираем, потому что стейт заново инициализируется (происходит ререндер компонента после перехода на страницы)
    // функция для перемещения по роутам
    // const navigate = useNavigate();

    // После deep partial кастуем к StateSchema
    const store = createReduxStore(
        // здесь кастовать к типам это вынужденная необходимость(в конфигурационных файла это иногда можно)
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
