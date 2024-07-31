import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: ReactNode;
    // Приводим к DeepPartial
    initialState?: DeepPartial<StateSchema>
}

export function StoreProvider(props: StoreProviderProps) {
    const {
        children,
        initialState,
    } = props;
    // После deep partial кастуем к StateSchema
    const store = createReduxStore(initialState as StateSchema);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
