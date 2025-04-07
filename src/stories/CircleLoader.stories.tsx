import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CircleLoader from 'components/CircleLoader/CircleLoader';

export default {
  title: 'Components/CircleLoader',
  component: CircleLoader,
  argTypes: {
    size: { control: { type: 'number', min: 8, max: 64, step: 4 } },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof CircleLoader>> = (args) => <CircleLoader {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
