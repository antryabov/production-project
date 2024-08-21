import 'app/styles/index.scss';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import testAvatar from 'shared/assets/tests/storybook.jpg';
import CommentList from './CommentList';

export default {
    title: 'entities/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'Hello!',
            user: {
                id: '1',
                username: 'admin',
                avatar: testAvatar,
            },
        },
        {
            id: '2',
            text: 'Hi!',
            user: {
                id: '2',
                username: 'user',
                avatar: testAvatar,
            },
        },
    ],
};
Normal.decorators = [StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
    comments: [
        {
            id: '1',
            text: 'Hello!',
            user: {
                id: '1',
                username: 'admin',
                avatar: testAvatar,
            },
        },
        {
            id: '2',
            text: 'Hi!',
            user: {
                id: '2',
                username: 'user',
                avatar: testAvatar,
            },
        },
    ],
    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
