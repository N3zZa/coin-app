// components/AddCoinModal/AddCoinModal.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AddCoinModal from 'components/AddCoinModal/AddCoinModal';
import { CoinsContext, CoinsContextType } from 'context/CoinsContext';
import { AssetItemModel } from 'types/AssetItemModel';

// Заглушка для addPortfolioItem
const mockAddPortfolioItem = (asset: AssetItemModel, amount: number) => {
  console.log('Added coin:', asset, 'Amount:', amount);
};

// Заглушка для removePortfolioCoin
const mockRemovePortfolioCoin = (coinID: string) => {
  console.log('Removed coin with id:', coinID);
};

// Заглушка для clearPortfolio
const mockClearPortfolio = () => {
  console.log('Clear portfolio');
};

const mockRefreshCoins = () => {
  console.log('Refresh coins');
};
// Заглушка для других свойств
const mockCoinsContext: CoinsContextType = {
  assets: [],
  loading: false,
  error: null,
  portfolioCoinsId: [],
  addPortfolioItem: mockAddPortfolioItem,
  removePortfolioCoin: mockRemovePortfolioCoin,
  clearPortfolio: mockClearPortfolio,
  refeshCoins: mockRefreshCoins,
  portfolioPrice: 0,
  portfolioCoins: [],
  setPortfolioCoins: () => {},
  initialPortfolioPrice: 0,
};

// Провайдер контекста для Storybook
const CoinsContextProvider = ({ children }: { children: React.ReactNode }) => (
  <CoinsContext.Provider value={mockCoinsContext}>{children}</CoinsContext.Provider>
);

// Пример данных активов
const mockAsset: AssetItemModel = {
  id: 'bitcoin',
  rank: '1',
  symbol: 'BTC',
  name: 'Bitcoin',
  supply: '18800000',
  maxSupply: '21000000',
  marketCapUsd: 800000000000,
  volumeUsd24Hr: '30000000000',
  priceUsd: 80000,
  changePercent24Hr: 2.5,
  vwap24Hr: '59000',
  amount: 1,
};

const meta: Meta<typeof AddCoinModal> = {
  title: 'Components/AddCoinModal',
  component: AddCoinModal,
  decorators: [
    (Story) => (
      <CoinsContextProvider>
        <Story />
      </CoinsContextProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(true);

  return <AddCoinModal asset={mockAsset} coinName="Bitcoin" isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export const Default = Template.bind({});
Default.args = {};
