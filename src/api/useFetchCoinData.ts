import { useState, useEffect } from 'react';
import axios from 'axios';
import { AssetItemModel } from 'types/AssetItemModel';
import { GraphData } from 'types/GraphData';

// function that needs to get info about one coin or get info about history of one coin
export const useFetchCoinData = (id: string, fetchType: 'coin' | 'history', interval: 'd1' | 'h12' | 'h1' = 'd1') => {
  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  const [history, setHistory] = useState<GraphData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);

        const url =
          fetchType === 'coin'
            ? `https://api.coincap.io/v2/assets/${id}`
            : `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (fetchType === 'coin') {
          const assetItems = [
            {
              id: response.data.data.id,
              rank: response.data.data.rank,
              symbol: response.data.data.symbol,
              name: response.data.data.name,
              supply: response.data.data.supply,
              maxSupply: response.data.data.maxSupply,
              marketCapUsd: Math.round(response.data.data.marketCapUsd * 100) / 100,
              volumeUsd24Hr: response.data.data.volumeUsd24Hr,
              priceUsd: Math.round(response.data.data.priceUsd * 100) / 100,
              changePercent24Hr: Math.round(response.data.data.changePercent24Hr * 100) / 100,
              vwap24Hr: response.data.data.vwap24Hr,
              amount: 1,
            },
          ];
          setAssets(assetItems);
        } else {
          const priceData = response.data.data.map((entry: GraphData) => ({
            time: new Date(entry.time).toLocaleDateString(),
            priceUsd: parseFloat(entry.priceUsd),
          }));
          setHistory(priceData);
        }
      } catch (error) {
        setError(true);
        console.error(`Error fetching coin data,type:"${fetchType}":`, error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, fetchType, interval]);

  useEffect(() => {
    if (error) {
      console.log(error);
      console.error(`Error fetching coin data`, error);
    }
  }, [error]);

  return { assets, history, loading, error };
};
