import axios from 'axios';
import { AssetItemModel } from 'types/AssetItemModel';

type FetchAssetsParams = {
  setAssets: React.Dispatch<React.SetStateAction<AssetItemModel[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string|null>>;
};

// function that needs to get coins from api
export const fetchCoins = async ({ setAssets, setLoading, setError }: FetchAssetsParams) => {
  try {
      setError(null);
      setLoading(true);
    const response = await axios.get('https://api.coincap.io/v2/assets', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const assetItems = response.data.data.map((asset: AssetItemModel) => ({
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
    setAssets(assetItems);
  } catch (error) {

    if (error instanceof Error) {
      if (error.message.includes('429')) {
        setError('Too many requests');
      }
    }
    console.error('Error fetching data assets:', error);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
};
