import 'app/styles/index.scss';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore natus nisi quae dicta amet reiciendis earum, aperiam, blanditiis harum impedit, in inventore. Maiores ducimus hic ut. Laboriosam ducimus quibusdam dolorum quaerat quasi magni provident nobis molestiae temporibus excepturi esse pariatur, ipsa, molestias fugit reprehenderit ullam alias ipsum repellendus aliquam adipisci tenetur voluptatibus culpa consectetur. Magnam quam facilis similique saepe adipisci, illo corrupti repellat mollitia accusamus ad odio iure labore rerum placeat dolorum ut enim optio magni nisi molestias cum impedit. In, vel, accusantium voluptatibus cum tempora voluptas ipsum nihil ut aliquam esse quae dolores at possimus provident, repellendus modi vero?',
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
