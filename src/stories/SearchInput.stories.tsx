import { Meta, StoryFn } from '@storybook/react';
import SearchInput, { SearchInputProps } from 'components/SearchInput/SearchInput';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
} as Meta;

const Template: StoryFn<SearchInputProps> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchQuery: '',
  setSearchQuery: (newValue: string) => console.log('Search query changed:' + newValue),
};
