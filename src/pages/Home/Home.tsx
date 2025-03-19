import CoinsTable from 'components/CoinsTable/CoinsTable';
import { useContext } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { CoinsContext } from 'context/CoinsContext';

const Home = () => {

  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('CoinsContext используется вне CoinsProvider');
  }

  const { assets,loading,error } = context;

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
