import CoinsTable from 'components/CoinsTable/CoinsTable';
import { useContext } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { CoinsContext } from 'context/CoinsContext';
import Button from 'components/Button/Button';
import refreshImg from "assets/refresh.svg"

const Home = () => {

  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('CoinsContext используется вне CoinsProvider');
  }

  const { assets, loading, error, refeshCoins } = context;

  const handleRefreshButton = () => {
    refeshCoins()
  }
  if (error) {  
    return (
      <main className="HomePage flex items-center gap-2 w-fit mx-auto">
        <h1 className='text-2xl'>{error}</h1>
        <Button onClick={handleRefreshButton} variant="blue">
          <img width={20} src={refreshImg} alt="refresh" />
        </Button>
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
