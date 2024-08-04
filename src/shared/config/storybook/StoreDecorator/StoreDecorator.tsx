import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';

export const StoreDecorator = (store: DeepPartial<StateSchema>) => function (StoryComponent: Story) {
    return (
        <StoreProvider initialState={store}>
            <StoryComponent />
        </StoreProvider>
    );
};
