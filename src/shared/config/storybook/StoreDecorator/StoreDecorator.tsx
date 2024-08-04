import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { loginReducer } from 'features/AuthByUsername';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
};

export const StoreDecorator = (
    store: DeepPartial<StateSchema>,
    // при необходимости, можно принимать снаружи асинхронные редюсеры для отдельных стори кейсов
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => function (StoryComponent: Story) {
    return (
        <StoreProvider initialState={store} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
            <StoryComponent />
        </StoreProvider>
    );
};
