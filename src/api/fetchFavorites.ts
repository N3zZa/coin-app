import axios from 'axios';
import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel';

type FetchAssetsParams = {
  favorites: PortfolioCoinsId[];
  setAssets: React.Dispatch<React.SetStateAction<AssetItemModel[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const fetchFavorites = async ({ setAssets, favorites, setError, setLoading }: FetchAssetsParams) => {
  try {
    if (favorites.length === 0) return;
    console.log(favorites)
    setLoading(true)
    const BATCH_SIZE = 5; // Количество запросов за раз
    const DELAY = 1000; // Задержка между батчами в миллисекундах

    const results = [];

    for (let i = 0; i < favorites.length; i += BATCH_SIZE) {
      const batch = favorites.slice(i, i + BATCH_SIZE);

      const requests = batch.map(({id}) =>
        axios
          .get(`https://api.coincap.io/v2/assets/${id}`)
          .then((response) => response.data)
          .catch((error) => console.error(`Failed to fetch ${id}`, error)),
      );

      const batchResults = await Promise.allSettled(requests);
      results.push(...batchResults);

      if (i + BATCH_SIZE < favorites.length) {
        await new Promise((resolve) => setTimeout(resolve, DELAY));
      }
    }

    const AssetsData = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value.data);

    const assets = AssetsData.map((asset: AssetItemModel) => {
      const amount = favorites.find((item) => item.id === asset.id)?.amount
      return {
        ...asset,
        marketCapUsd: Math.round(asset.marketCapUsd * 100) / 100,
        priceUsd: Math.round(asset.priceUsd * 100) / 100,
        changePercent24Hr: Math.round(asset.changePercent24Hr * 100) / 100,
        amount: amount ? amount : 1,
      };});

    setAssets(assets);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('429')) {
        setError('Too many requests');
      }
    }
    setAssets([])
    console.error('Error fetching favorite assets: ', error);
  } finally {
    setLoading(false)
  }
};
