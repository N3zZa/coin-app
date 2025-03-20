import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from 'components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const BlueButton = Template.bind({});
BlueButton.args = {
  children: 'Blue Button',
  variant: 'blue',
  className: 'p-2',
};

export const GrayButton = Template.bind({});
GrayButton.args = {
  children: 'Gray Button',
  variant: 'gray',
  className: 'p-2',
};
