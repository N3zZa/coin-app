import { fetchCoins } from 'api/fetchCoins';
import { fetchFavorites } from 'api/fetchFavorites';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { LocalStorageService } from 'utils/localStorage';

interface CoinsContextType {
  assets: AssetItemModel[];
  loading: boolean;
  error: string | null;
  portfolioCoinsId: string[];
  togglePortfolioItem: (asset: AssetItemModel) => void;
  isInPortfolio: (asset: string) => boolean;
  portfolioPrice: number;
  setPortfolioPrice: React.Dispatch<React.SetStateAction<number>>;
  portfolioCoins: AssetItemModel[];
  setPortfolioCoins: React.Dispatch<React.SetStateAction<AssetItemModel[]>>;
}

export const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

const PORTFOLIOITEMS_KEY = 'portfolioItems';

export const CoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [portfolioCoinsId, setPortfolioCoinsId] = useState<string[]>(
    () => LocalStorageService.getItem<string[]>(PORTFOLIOITEMS_KEY) || [],
  );

  const [portfolioPrice, setPortfolioPrice] = useState<number>(0);
  
  const [portfolioCoins, setPortfolioCoins] = useState<AssetItemModel[]>([]);

  useEffect(() => {
    LocalStorageService.setItem(PORTFOLIOITEMS_KEY, portfolioCoinsId);
    fetchFavorites({ favorites: portfolioCoinsId, setAssets: setPortfolioCoins, setError, setLoading });
  }, []);

   useEffect(() => {
     setLoading(false);
     setError(null);
     fetchCoins({ setAssets, setLoading, setError });
   }, []);

   useEffect(() => {
     const getPortfolioPrice = () => {
       return portfolioCoins.reduce((acc, item) => Number(acc) + Number(item.priceUsd), 0);
     };
     setPortfolioPrice(Number(getPortfolioPrice().toFixed(2)));
   }, [portfolioCoins])


  const togglePortfolioItem = (asset: AssetItemModel) => {
     setPortfolioCoins((prev) =>
      prev.find((assetItemId) => assetItemId.id.toString() === asset.id.toString())
        ? prev.filter((assetItemId) => {
          return assetItemId.id.toString() !== asset.id.toString()
        })
        : [...prev, asset])

    setPortfolioCoinsId((prev) =>
      prev.find((assetItemId) => assetItemId === asset.id.toString())
        ? prev.filter((assetItemId) => {
          return assetItemId !== asset.id.toString()
        })
        : [...prev, asset.id.toString()],
    );
  };
  const isInPortfolio = (assetId: string) => {
    if (portfolioCoinsId.find((assetItemId) => assetItemId === assetId.toString())) return true;
    return false;
  };

  return (
    <CoinsContext.Provider
      value={{
        assets,
        portfolioCoinsId,
        portfolioCoins,
        setPortfolioCoins,
        togglePortfolioItem,
        setPortfolioPrice,
        isInPortfolio,
        portfolioPrice,
        loading,
        error,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
