import { fetchCoins } from 'api/fetchCoins';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel';
import { LocalStorageService } from 'utils/localStorage';

export interface CoinsContextType {
  assets: AssetItemModel[];
  loading: boolean;
  error: string | null;
  portfolioCoinsId: PortfolioCoinsId[];
  addPortfolioItem: (asset: AssetItemModel, amount: number) => void;
  portfolioPrice: number;
  portfolioCoins: AssetItemModel[];
  setPortfolioCoins: React.Dispatch<React.SetStateAction<AssetItemModel[]>>;
  initialPortfolioPrice: number;
  clearPortfolio: () => void;
  removePortfolioCoin: (coinID: string) => void;
  refeshCoins: () => void;
}

export const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

const PORTFOLIOITEMS_KEY = 'portfolioItems';
const INITIAL_PORTFOLIO_PRICE_KEY = 'initialPortfolioPrice';

export const CoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [portfolioCoinsId, setPortfolioCoinsId] = useState<PortfolioCoinsId[]>(
    () => LocalStorageService.getItem<PortfolioCoinsId[]>(PORTFOLIOITEMS_KEY) || [],
  );

  const [portfolioPrice, setPortfolioPrice] = useState<number>(0);

  const [initialPortfolioPrice, setInitialPortfolioPrice] = useState<number>(
    () => LocalStorageService.getItem<number>(INITIAL_PORTFOLIO_PRICE_KEY) || 0,
  );

  const [portfolioCoins, setPortfolioCoins] = useState<AssetItemModel[]>([]);

  useEffect(() => {
    LocalStorageService.setItem(PORTFOLIOITEMS_KEY, portfolioCoinsId);
    LocalStorageService.setItem(INITIAL_PORTFOLIO_PRICE_KEY, initialPortfolioPrice);
  }, [portfolioCoinsId, initialPortfolioPrice]);

  const refeshCoins = () => {
    fetchCoins({ setAssets, setLoading, setError });
  };

  useEffect(() => {
    setLoading(false);
    setError(null);
    refeshCoins();
  }, []);

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

  /*  const isInPortfolio = (coinID: string) => {
    return portfolioCoinsId.some((item) => item.id === coinID);
  }; */

  const removePortfolioCoin = (coinID: string) => {
    setPortfolioCoins((prev) => prev.filter((item) => item.id !== coinID));
    setPortfolioCoinsId((prev) => prev.filter((item) => item.id !== coinID));
    setInitialPortfolioPrice(0);
  };

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
