import type { Meta, StoryObj } from '@storybook/react';
import AssetItem from 'components/AssetItem/AssetItem';
import { BrowserRouter } from 'react-router';
import { CoinsContext, CoinsContextType } from 'context/CoinsContext';
import { AssetItemModel } from 'types/AssetItemModel';


// Пример данных для актива
const mockAsset: AssetItemModel = {
  id: 'bitcoin',
  rank: '1',
  symbol: 'BTC',
  name: 'Bitcoin',
  supply: '21000000',
  maxSupply: '21000000',
  marketCapUsd: 600000000000,
  volumeUsd24Hr: '20000000000',
  priceUsd: 30000,
  changePercent24Hr: 2.5,
  vwap24Hr: '29000',
  amount: 0,
};

const mockContextValue: CoinsContextType = {
  assets: [mockAsset],
  loading: false,
  error: null,
  portfolioCoinsId: [{ id: 'bitcoin', amount: 0.5 }],
  portfolioCoins: [mockAsset],
  portfolioPrice: 0,
  setPortfolioCoins: () => {},
  initialPortfolioPrice: 0,
  addPortfolioItem: () => {},
  clearPortfolio: () => {},
  removePortfolioCoin: () => {},
  refeshCoins: () => {},
};

const meta: Meta<typeof AssetItem> = {
  title: 'Components/AssetItem',
  component: AssetItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <CoinsContext.Provider value={mockContextValue}>
          <table>
            <tbody>
              <Story />
            </tbody>
          </table>
        </CoinsContext.Provider>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AssetItem>;

export const Default: Story = {
  args: {
    asset: mockAsset,
    currentPage: 1,
    itemsPerPage: 10,
    index: 0,
  },
};
