import 'app/styles/index.scss';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/storybook.jpg';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
// здесь уже зависит работа страницы от куска стейта
Normal.decorators = [StoreDecorator({
    profile: {
        form: {
            username: 'admin',
            age: 27,
            country: Country.Armenia,
            lastname: 'Ivanov',
            first: 'Ivan',
            city: 'Moscow',
            currency: Currency.RUB,
            avatar,
        },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {
            username: 'admin',
            age: 27,
            country: Country.Armenia,
            lastname: 'Ivanov',
            first: 'Ivan',
            city: 'Moscow',
            currency: Currency.RUB,
            avatar,
        },
    },
})];
