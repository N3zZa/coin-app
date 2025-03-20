import { fetchCoins } from 'api/fetchCoins';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel';
import { LocalStorageService } from 'utils/localStorage';

export interface CoinsContextType {
  assets: AssetItemModel[]; // api main assets
  loading: boolean; // loader
  error: string | null; // error
  portfolioCoinsId: PortfolioCoinsId[]; // portfolio coins from localstorage
  addPortfolioItem: (asset: AssetItemModel, amount: number) => void; // fun on adding a coin to the portfolio
  portfolioPrice: number; // price from api
  portfolioCoins: AssetItemModel[]; // portfolio coins that we add by add button
  setPortfolioCoins: React.Dispatch<React.SetStateAction<AssetItemModel[]>>;
  initialPortfolioPrice: number; // initial price that we add to the portfolio
  clearPortfolio: () => void; // clear portfolio func
  removePortfolioCoin: (coinID: string) => void; // remove portfolio coin func
  refeshCoins: () => void; // getting coins from the api func
}

export const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

const PORTFOLIOITEMS_KEY = 'portfolioItems';
const INITIAL_PORTFOLIO_PRICE_KEY = 'initialPortfolioPrice';

export const CoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // state of main table assets
  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  // loader and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // state of portfolioCoinsId ({id, amoint}), needed for localstorage
  const [portfolioCoinsId, setPortfolioCoinsId] = useState<PortfolioCoinsId[]>(
    () => LocalStorageService.getItem<PortfolioCoinsId[]>(PORTFOLIOITEMS_KEY) || [],
  );

  // state of the price received from the api
  const [portfolioPrice, setPortfolioPrice] = useState<number>(0);

  // state of the initial price that we add to the portfolio
  const [initialPortfolioPrice, setInitialPortfolioPrice] = useState<number>(
    () => LocalStorageService.getItem<number>(INITIAL_PORTFOLIO_PRICE_KEY) || 0,
  );

  // state of portfolio coins that we add by add button
  const [portfolioCoins, setPortfolioCoins] = useState<AssetItemModel[]>([]);

  // useEffect controls localstorage state changes
  useEffect(() => {
    LocalStorageService.setItem(PORTFOLIOITEMS_KEY, portfolioCoinsId);
    LocalStorageService.setItem(INITIAL_PORTFOLIO_PRICE_KEY, initialPortfolioPrice);
  }, [portfolioCoinsId, initialPortfolioPrice]);

  // func to getting coins from the api
  const refeshCoins = () => {
    fetchCoins({ setAssets, setLoading, setError });
  };

  // getting coins from the api when the page loads
  useEffect(() => {
    setLoading(false);
    setError(null);
    refeshCoins();
  }, []);

  // calculatung the api price when assets(api items) or portfolioCoinsId changes
  useEffect(() => {
    const filteredItemsPrice = assets
      .filter((item) => portfolioCoinsId.some((portfolioItem) => portfolioItem.id === item.id))
      .reduce((acc, item) => {
        const portfolioItem = portfolioCoinsId.find((portfolioItem) => portfolioItem.id === item.id);
        const totalItemPrice = portfolioItem ? Number(item.priceUsd) * portfolioItem.amount : 0;
        return acc + totalItemPrice;
      }, 0);
    if (filteredItemsPrice) {
      setPortfolioPrice(filteredItemsPrice);
    }
  }, [assets, portfolioCoinsId]);

  // calculating the initial price when portfolioCoins(cur added items) or initialPortfolioPrice changes
  useEffect(() => {
    const getPortfolioPrice = () => {
      return portfolioCoins.reduce((acc, item) => {
        const purchasePrice = Number(item.priceUsd);
        return Number(acc) + purchasePrice;
      }, 0);
    };

    const currentPrice = getPortfolioPrice();

    if (currentPrice > initialPortfolioPrice) {
      const newInitialPrice = initialPortfolioPrice + (currentPrice - initialPortfolioPrice);
      setInitialPortfolioPrice(newInitialPrice);
    }
  }, [portfolioCoins, initialPortfolioPrice]);

  // func of adding items
  const addPortfolioItem = (asset: AssetItemModel, amount: number = 1) => {
    setInitialPortfolioPrice((prev) => prev + asset.priceUsd);
    setPortfolioCoins((prev) =>
      prev.find((assetItem) => assetItem.id.toString() === asset.id.toString())
        ? prev.map((assetItem) =>
            assetItem.id.toString() === asset.id.toString()
              ? {
                  ...assetItem,
                  priceUsd: assetItem.priceUsd + asset.priceUsd,
                }
              : assetItem,
          )
        : [...prev, asset],
    );
    setPortfolioCoinsId((prev) => {
      const existingItem = prev.find((item) => item.id === asset.id);
      if (existingItem) {
        return prev.map((item) => (item.id === asset.id ? { ...item, amount: item.amount + amount } : item));
      } else {
        return [...prev, { id: asset.id, amount }];
      }
    });
  };

  // func of removing an item from  the portfolio
  const removePortfolioCoin = (coinID: string) => {
    setPortfolioCoins((prev) => prev.filter((item) => item.id !== coinID));
    setPortfolioCoinsId((prev) => prev.filter((item) => item.id !== coinID));
    setInitialPortfolioPrice(0);
  };

  // func of clearing items from the portfolio
  const clearPortfolio = () => {
    setPortfolioCoins([]);
    setPortfolioCoinsId([]);
    setInitialPortfolioPrice(0);
    LocalStorageService.removeItem(PORTFOLIOITEMS_KEY);
    LocalStorageService.removeItem(INITIAL_PORTFOLIO_PRICE_KEY);
  };

  return (
    <CoinsContext.Provider
      value={{
        assets,
        portfolioCoinsId,
        portfolioCoins,
        refeshCoins,
        setPortfolioCoins,
        addPortfolioItem,
        clearPortfolio,
        removePortfolioCoin,
        portfolioPrice,
        initialPortfolioPrice,
        loading,
        error,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
