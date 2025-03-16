import axios from 'axios';
import { AssetItemModel } from 'types/AssetItemModel';

type FetchAssetsParams = {
  favorites: string[];
  setAssets: React.Dispatch<React.SetStateAction<AssetItemModel[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const fetchFavorites = async ({ setAssets, favorites, setError }: FetchAssetsParams) => {
  try {
    if (favorites.length === 0) return;
    const requests = favorites.map((id) =>
      axios
        .get(`https://api.coincap.io/v2/assets/${id}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Passing API key in the Authorization header
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.data),
    );

    const results = await Promise.all(requests);
    const AssetsData = results.map((result) => result.data);

    const assets = AssetsData.map((asset: AssetItemModel) => ({
      id: asset.id,
      rank: asset.rank,
      symbol: asset.symbol,
      name: asset.name,
      supply: asset.supply,
      maxSupply: asset.maxSupply,
      marketCapUsd: Math.round(asset.marketCapUsd * 100) / 100,
      volumeUsd24Hr: asset.volumeUsd24Hr,
      priceUsd: Math.round(asset.priceUsd * 100) / 100,
      changePercent24Hr: Math.round(asset.changePercent24Hr * 100) / 100,
      vwap24Hr: asset.vwap24Hr,
    }));
    setAssets(assets);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('429')) {
        setError('Too many requests');
      }
    }
    console.error('Error fetching favorite assets: ', error);
  }
};
