import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useLocation, useNavigate } from 'react-router';
import { useFetchCoinData } from 'api/useFetchCoinData';
import { useContext, useState } from 'react';
import CircleLoader from 'components/CircleLoader/CircleLoader';
import { AssetItemModel } from 'types/AssetItemModel';
import { FavoritesContext } from 'context/FavoritesContext';
import Button from 'components/Button/Button';



const ItemPage: React.FC = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [interval, setInterval] = useState<'d1' | 'h12' | 'h1'>('d1');

  const coinHistory = useFetchCoinData(state.id, 'history', interval);
  const coinData = useFetchCoinData(state.id, "coin");
  const asset = coinData.assets[0]

    const context = useContext(FavoritesContext);
  
    if (!context) {
      throw new Error('FavoritesContext используется вне FavoritesProvider');
    }
  
    const { toggleFavorite, isFavorite } = context;
 
  if (coinData.loading || asset === undefined) return <div>Loading...</div>;

    const handleAddClick = (asset: AssetItemModel) => {
      toggleFavorite(asset);
    };

 
  

  return (
    <div className="w-full h-96 p-0 md:p-4">
      {coinData.error || (coinHistory.error && <h1>Error!</h1>)}
      <div className="mb-5">
        <Button onClick={() => navigate('/')} className="mb-6">
          &lt;-
        </Button>
        <div className="flex items-center gap-2 m-auto">
          <img
            width={40}
            src={`https://assets.coincap.io/assets/icons/${asset?.symbol.toLowerCase()}@2x.png`}
            alt="icon"
          />
          <h1 className="text-2xl font-bold">
            {asset?.name} <span className="opacity-50 mx-1">{asset?.symbol}</span>
          </h1>

          {isFavorite(asset.id) ? (
            <Button variant="blue" onClick={() => handleAddClick(asset)}>
              Remove
            </Button>
          ) : (
            <Button variant="blue" onClick={() => handleAddClick(asset)}>
              Add
            </Button>
          )}
        </div>
        <ul className="flex flex-col gap-2 mt-2">
          <li>Rank: {asset?.rank}</li>
          <li>Price: ${Number(asset?.priceUsd)?.toFixed(2)}</li>
          <li>Market Cap: ${Number(asset?.marketCapUsd)?.toFixed(2)}</li>
          <li>Supply: {Number(asset?.supply)?.toFixed(2)}</li>
          <li>Max supply: {Number(asset?.maxSupply)?.toFixed(2)}</li>
        </ul>
      </div>
      <div className="flex gap-4 mb-4">
        {['d1', 'h12', 'h1'].map((int) => (
          <Button
            key={int}
            onClick={() => setInterval(int as 'd1' | 'h12' | 'h1')}
            className={`${interval === int ? 'bg-blue-500 text-white' : ''}`}
          >
            {int}
          </Button>
        ))}
      </div>
      <h1 className="text-xl font-bold">Price Chart ({interval})</h1>
      {coinHistory.loading ? (
        <CircleLoader />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={coinHistory.history} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ItemPage;
