import type { Meta, StoryFn } from '@storybook/react';
import PortfolioModal from 'components/PortfolioModal/PortfolioModal';
import { CoinsContext } from 'context/CoinsContext';
import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel';
import { BrowserRouter } from 'react-router';

export default {
  title: 'Components/PortfolioModal',
  component: PortfolioModal,
} as Meta;

const Template: StoryFn = (args) => (
  <BrowserRouter>
    <CoinsContext.Provider value={args.contextValue}>
      <PortfolioModal title={args.title} coins={args.coins} setIsOpen={args.setIsOpen} isOpen={args.isOpen} />
    </CoinsContext.Provider>
  </BrowserRouter>
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
  title: 'My Portfolio',
  coins: mockPortfolioCoinsId,
  setIsOpen: () => {},
  isOpen: true,
  contextValue: {
    assets: mockAssets,
    portfolioCoinsId: mockPortfolioCoinsId,
    portfolioCoins: mockAssets,
    refeshCoins: () => {},
    setPortfolioCoins: () => {},
    addPortfolioItem: () => {},
    clearPortfolio: () => {},
    removePortfolioCoin: () => {},
    portfolioPrice: 100000,
    initialPortfolioPrice: 90000,
    loading: false,
    error: null,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  contextValue: { ...Default.args.contextValue, loading: true },
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  contextValue: { ...Default.args.contextValue, error: 'Failed to load data.' },
};

export const EmptyPortfolio = Template.bind({});
EmptyPortfolio.args = {
  title: 'Empty Portfolio',
  coins: [],
  setIsOpen: () => {},
  isOpen: true,
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
    error: null,
  },
};
