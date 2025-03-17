import React, { useEffect, useState } from 'react'
import favoriteImg from "assets/fav.svg"
import homeImg from "assets/home.svg"
import { Link } from 'react-router';
import { AssetItemModel } from 'types/AssetItemModel';
import axios from 'axios';
import CircleLoader from 'components/CircleLoader/CircleLoader';
 
const Header:React.FC = () => {
  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get('https://api.coincap.io/v2/assets?limit=3', {
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
    fetchCoins()
  }, [])

  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <img width={30} src={homeImg} alt="fav" />
        </Link>
        <nav>
          <ul className="flex items-center gap-3">
            {!!error && <div>error</div>}
            {loading ? (
              <CircleLoader size={10} />
            ) : (
              assets.map((asset) => (
                <li className="flex items-center gap-1 border-[1px] border-[#343648] px-3 py-1" key={asset.id}>
                  <img
                    width={30}
                    src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                    alt="icon"
                  />
                  <p>
                    {asset.name} <span> ${asset.priceUsd}</span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </nav>
        <Link to={'/favorites'}>
          <img width={30} src={favoriteImg} alt="fav" />
        </Link>
      </div>
    </header>
  );
}

export default Header