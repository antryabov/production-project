import 'app/styles/index.scss';
import { addDecorator } from '@storybook/react';
import { Theme } from '../../src/app/providers/ThemeProvider/index';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

// сторисы рендерятся изолированно, поэтому, нужны декораторы для правильной работы компонентов

// глобальное подключение стилей через декоратор
addDecorator(StyleDecorator);
// работают стили в storybook из за того, что в светлой теме селектор :root
// и через декоратор глобально обернули stories компоненты
addDecorator(ThemeDecorator(Theme.LIGHT)); // глобальное подключение светлой темы (по умолчанию)

// У нас есть react router dom. Для этого оборачиваем компоненты в BrowserRouter
addDecorator(RouterDecorator);
