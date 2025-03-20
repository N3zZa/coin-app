import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PortfolioInfo from 'components/PortfolioInfo/PortfolioInfo';
import { CoinsContext, CoinsContextType } from 'context/CoinsContext';
import { AssetItemModel } from 'types/AssetItemModel';

// Моковые функции для контекста
const mockAddPortfolioItem = (asset: AssetItemModel, amount: number) => {console.log(asset, amount)};
const mockRemovePortfolioCoin = (coinID: string) => {console.log(coinID)};
const mockClearPortfolio = () => {};

// Моковый контекст
const mockCoinsContext: CoinsContextType = {
  assets: [],
  loading: false,
  error: null,
  portfolioCoinsId: [{id: 'bitcoin', amount: 1}, {id: 'ethereum', amount: 1}],
  addPortfolioItem: mockAddPortfolioItem,
  removePortfolioCoin: mockRemovePortfolioCoin,
  clearPortfolio: mockClearPortfolio,
  portfolioPrice: 1200,
  refeshCoins: () => {},
  portfolioCoins: [],
  setPortfolioCoins: () => {},
  initialPortfolioPrice: 1000,
};

const CoinsContextProvider = ({ children }: { children: React.ReactNode }) => (
  <CoinsContext.Provider value={mockCoinsContext}>{children}</CoinsContext.Provider>
);

const meta: Meta<typeof PortfolioInfo> = {
  title: 'Components/PortfolioInfo',
  component: PortfolioInfo,
  decorators: [
    (Story) => (
      <CoinsContextProvider>
        <Story />
      </CoinsContextProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof PortfolioInfo> = (args) => <PortfolioInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('Clicked on PortfolioInfo'),
};
