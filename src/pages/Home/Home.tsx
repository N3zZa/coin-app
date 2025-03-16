import { fetchCoins } from "api/fetchCoins";
import CoinsTable from "components/CoinsTable/CoinsTable";
import { useEffect, useState } from "react";
import { AssetItemModel } from "types/AssetItemModel";

const Home = () => {
   const [assets, setAssets] = useState<AssetItemModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(true);

   useEffect(() => {
     fetchCoins({ setAssets, setLoading, setError });
   }, []);

   if (error) {
    return (
      <main className="HomePage">
        <h1>Error!</h1>
      </main>
    );
   }

  return (
    <main className="HomePage">
      <CoinsTable assets={assets} loading={loading} />
    </main>
  );
}

export default Home