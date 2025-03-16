import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { LocalStorageService } from 'utils/localStorage';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (asset: AssetItemModel) => void;
  isFavorite: (asset: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_KEY = 'favoriteAssets';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>(
    () => LocalStorageService.getItem<string[]>(FAVORITES_KEY) || []
  );

  useEffect(() => {
    LocalStorageService.setItem(FAVORITES_KEY, favorites);
  }, [favorites]);

  const toggleFavorite = (asset: AssetItemModel) => {
    setFavorites((prev) =>
      prev.find((assetItemId) => assetItemId === asset.id.toString())
        ? prev.filter((assetItemId) => assetItemId !== asset.id.toString())
        : [...prev, asset.id.toString()],
    );
  };

  const isFavorite = (assetId: string) => {
    if (favorites.find((assetItemId) => assetItemId === assetId.toString())) return true;
    return false;
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
