import CoinsTable from 'components/CoinsTable/CoinsTable';
import { useEffect, useState } from 'react';
/* import { fetchCoins } from 'api/fetchCoins'; */
import { AssetItemModel } from 'types/AssetItemModel';

/*  */
import { assets } from 'constants/assets';

const Home = () => {
  /*  const [assets, setAssets] = useState<AssetItemModel[]>([]); */
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
    /* fetchCoins({ setAssets, setLoading, setError }); */
  }, []);

  if (error) {
    return (
      <main className="HomePage">
        <h1>{error}</h1>
      </main>
    );
  }

  return (
    <main className="HomePage">
      <CoinsTable assets={assets as AssetItemModel[]} loading={loading} />
    </main>
  );
};

export default Home;
