import 'app/styles/index.scss';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import testAvatar from 'shared/assets/tests/storybook.jpg';
import CommentCard from './CommentCard';

export default {
    title: 'entities/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: '1',
        text: 'Hello!',
        user: {
            id: '1',
            username: 'admin',
            avatar: testAvatar,
        },
    },
};
Normal.decorators = [StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'Hello!',
        user: {
            id: '1',
            username: 'admin',
            avatar: testAvatar,
        },
    },
    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
