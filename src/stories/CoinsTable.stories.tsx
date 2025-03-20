import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CoinsTable from 'components/CoinsTable/CoinsTable';
import { AssetItemModel } from 'types/AssetItemModel';
import { CoinsContext } from 'context/CoinsContext';
import { BrowserRouter as Router } from 'react-router';

export default {
  title: 'Components/CoinsTable',
  component: CoinsTable,
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof CoinsTable>> = (args) => (
  <Router>
    <CoinsContext.Provider
      value={{
        assets: args.assets,
        portfolioCoinsId: [],
        portfolioCoins: [],
        refeshCoins: () => {},
        setPortfolioCoins: () => {},
        addPortfolioItem: () => {},
        clearPortfolio: () => {},
        removePortfolioCoin: () => {},
        portfolioPrice: 0,
        initialPortfolioPrice: 0,
        loading: args.loading,
        error: null,
      }}
    >
      <CoinsTable {...args} />
    </CoinsContext.Provider>
  </Router>
);

const mockAssets: AssetItemModel[] = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '19837593.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: 1661637067837.67,
    volumeUsd24Hr: '3544184971.4100993282479103',
    priceUsd: 83762.03,
    changePercent24Hr: -0.12,
    vwap24Hr: '84268.6749552421655715',
    amount: 1,
  },
  {
    id: 'ethereum',
    rank: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    supply: '120619170.8322542500000000',
    maxSupply: '13000000.0000000000000000',
    marketCapUsd: 230127251919.32,
    volumeUsd24Hr: '2470977193.9282122077312460',
    priceUsd: 1907.88,
    changePercent24Hr: -0.96,
    vwap24Hr: '1933.3644256441780888',
    amount: 1,
  },
  {
    id: 'tether',
    rank: '3',
    symbol: 'USDT',
    name: 'Tether',
    supply: '143465026352.8368000000000000',
    maxSupply: '12300000.0000000000000000',
    marketCapUsd: 143556761322.59,
    volumeUsd24Hr: '10978381751.5432035632161319',
    priceUsd: 1,
    changePercent24Hr: -0.03,
    vwap24Hr: '1.0000530119547297',
    amount: 1,
  },
  {
    id: 'xrp',
    rank: '4',
    symbol: 'XRP',
    name: 'XRP',
    supply: '58108919817.0000000000000000',
    maxSupply: '15100000000.0000000000000000',
    marketCapUsd: 136510749896.52,
    volumeUsd24Hr: '905151087.0366208142902944',
    priceUsd: 2.35,
    changePercent24Hr: -2.56,
    vwap24Hr: '2.3978610161165907',
    amount: 1,
  },
  {
    id: 'binance-coin',
    rank: '5',
    symbol: 'BNB',
    name: 'BNB',
    supply: '144006830.0000000000000000',
    maxSupply: '144006830.0000000000000000',
    marketCapUsd: 86385423141.07,
    volumeUsd24Hr: '338996757.3753779477870264',
    priceUsd: 599.87,
    changePercent24Hr: 0.53,
    vwap24Hr: '609.3464768711672014',
    amount: 1,
  },
];

export const Default = Template.bind({});
Default.args = {
  assets: mockAssets,
  loading: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  assets: [],
  loading: true,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  assets: [],
  loading: false,
};
