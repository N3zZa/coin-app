import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AddInput from 'components/AddInput/AddInput';

export default {
  title: 'Components/AddInput',
  component: AddInput,
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
    minAmount: { control: 'number' },
    maxAmount: { control: 'number' },
    coinPrice: { control: 'number' },
  },
} as Meta<typeof AddInput>;

const Template: StoryFn<typeof AddInput> = (args) => {
  const [value, setValue] = useState('');

  return <AddInput {...args} value={value} onChange={(newValue) => setValue(newValue)} />;
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Enter amount',
  type: 'number',
  minAmount: 0,
  maxAmount: 1000,
  coinPrice: 10,
};
