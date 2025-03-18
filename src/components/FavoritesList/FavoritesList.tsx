/* import { fetchFavorites } from 'api/fetchFavorites'; */
import { FavoritesContext } from 'context/FavoritesContext';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { fetchFavorites } from 'api/fetchFavorites';
import { AssetItemModel } from 'types/AssetItemModel';
import CoinsTable from 'components/CoinsTable/CoinsTable';
import { Link, useNavigate } from 'react-router';
import Button from 'components/Button/Button';

const FavoritesList = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('FavoritesContext используется вне FavoritesProvider');
  }

  const { favorites } = context;

  useEffect(() => {
    fetchFavorites({ favorites, setAssets, setError, setLoading });
  }, []);


  if (error) {
    return (
      <div className="flex flex-col mx-auto max-w-fit mt-10 gap-4">
        <h1 className="text-2xl">Too many requests. Try again later.</h1>
        <Link className="px-4 py-2 bg-[#0326A9] hover:bg-[#05259E] rounded cursor-pointer w-fit mx-auto" to={'/'}>
          Back
        </Link>
      </div>
    );
  }

  return (
    <div>
      {assets.length === 0 && !loading ? (
        <div className="flex flex-col mx-auto max-w-fit mt-10 gap-4">
          <h1 className="text-2xl">You haven't added anything to favorites</h1>
          <Button className='w-fit mx-auto' variant='blue' onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
      ) : (
        <CoinsTable assets={assets} loading={loading} />
      )}
    </div>
  );
};

export default FavoritesList;
