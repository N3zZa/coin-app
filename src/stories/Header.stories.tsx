import { Meta, StoryFn } from '@storybook/react';
import Header from 'components/Header/Header';
import { CoinsContext } from 'context/CoinsContext';
import { BrowserRouter as Router } from 'react-router';
import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: StoryFn = (args) => (
  <Router>
    <CoinsContext.Provider value={args.contextValue}>
      <Header />
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
];

const mockPortfolioCoinsId: PortfolioCoinsId[] = [
  { id: 'bitcoin', amount: 1 },
  { id: 'ethereum', amount: 2 },
];

export const Default = Template.bind({});
Default.args = {
  contextValue: {
    assets: mockAssets,
    portfolioCoinsId: mockPortfolioCoinsId,
    portfolioCoins: [],
    refeshCoins: () => {},
    setPortfolioCoins: () => {},
    addPortfolioItem: () => {},
    clearPortfolio: () => {},
    removePortfolioCoin: () => {},
    portfolioPrice: 0,
    initialPortfolioPrice: 0,
    loading: false,
    error: null,
  },
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  contextValue: {
    assets: [],
    portfolioCoinsId: [],
    portfolioCoins: [],
    refeshCoins: () => {},
    setPortfolioCoins: () => {},
    addPortfolioItem: () => {},
    clearPortfolio: () => {},
    removePortfolioCoin: () => {},
    portfolioPrice: 0,
    initialPortfolioPrice: 0,
    loading: true,
    error: null,
  },
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  contextValue: {
    assets: [],
    portfolioCoinsId: [],
    portfolioCoins: [],
    refeshCoins: () => {},
    setPortfolioCoins: () => {},
    addPortfolioItem: () => {},
    clearPortfolio: () => {},
    removePortfolioCoin: () => {},
    portfolioPrice: 0,
    initialPortfolioPrice: 0,
    loading: false,
    error: 'Failed to fetch data.',
  },
};
