import 'app/styles/index.scss';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs from './Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    tabs: [
        {
            value: 'value 1',
            content: 'value 1',
        },
        {
            value: 'value 2',
            content: 'value 2',
        },
        {
            value: 'value 3',
            content: 'value 3',
        },
    ],
    value: 'value 2',
    // action мок функция
    onTabClick: action('onTabClick'),
};
