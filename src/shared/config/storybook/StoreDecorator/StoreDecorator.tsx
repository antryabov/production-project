import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername';
import 'app/styles/index.scss';

import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'features/EditableProfileCard';
import { articleDetailsReducer } from 'entities/Article';
import { articlesDetailsPageReducer } from 'pages/ArticleDetailsPage';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articlesDetailsPage: articlesDetailsPageReducer,
};

export const StoreDecorator = (
    // DeepPartial из глобальный тип в index.d.ts
    store: DeepPartial<StateSchema>,
    // при необходимости, можно принимать снаружи асинхронные редюсеры для отдельных стори кейсов
    asyncReducers?: ReducersList,
) => function (StoryComponent: Story) {
    return (
        <StoreProvider initialState={store} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
            <StoryComponent />
        </StoreProvider>
    );
};
