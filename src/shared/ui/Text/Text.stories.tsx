import 'app/styles/index.scss';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import Text, { TextSize, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title Lorem ipsum dolor',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis adipisci debitis, incidunt non cupiditate amet reprehenderit dolorem beatae at officiis?',
};

export const Error = Template.bind({});
Error.args = {
    title: 'Title Lorem ipsum dolor',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis adipisci debitis, incidunt non cupiditate amet reprehenderit dolorem beatae at officiis?',
    theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'Title Lorem ipsum dolor',
};

export const onlyText = Template.bind({});
onlyText.args = {
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis adipisci debitis, incidunt non cupiditate amet reprehenderit dolorem beatae at officiis?',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Title Lorem ipsum dolor',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis adipisci debitis, incidunt non cupiditate amet reprehenderit dolorem beatae at officiis?',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'Title Lorem ipsum dolor',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis adipisci debitis, incidunt non cupiditate amet reprehenderit dolorem beatae at officiis?',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Title Lorem ipsum dolor',
    size: TextSize.L,
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis adipisci debitis, incidunt non cupiditate amet reprehenderit dolorem beatae at officiis?',
};
