import { assets } from 'constants/assets';
import { useEffect, useState } from 'react'
import { AssetItemModel } from 'types/AssetItemModel';
/* import axios from "axios"; */

type Props = {}

const CoinsTable = (props: Props) => {
  const [data, setData] = useState<AssetItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Количество элементов на странице

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*   const response = await axios.get('https://api.coincap.io/v2/assets'); */
        /*  const assetItems = response.data.data.map((asset: AssetItemModel) => ({
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
         })); */
        const assetItems = assets.map((asset: any) => ({
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
        setData(assetItems);
      } catch (error) {
        console.error('Error fetching data assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Данные текущей страницы
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="max-w-full mx-auto relative">
      <table className="w-full max-h-[500px] h-full overflow-auto border-collapse border-[1px] border-black text-center">
        <thead className="border-[1px] border-black">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap(USD)</th>
            <th></th>
          </tr>
        </thead>

        {loading || (
          <tbody className="border-[1px] border-black h-[400px] overflow-auto">
            {currentData.map((asset, index) => (
              <tr key={asset.id} className=''>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{index + 1}</td>
                <td>
                  <img
                    width={30}
                    src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                    alt="icon"
                  />
                  <p>{asset.name}</p>
                </td>
                <td>{Number(asset.priceUsd).toFixed(2)}</td>
                <td>{Number(asset.changePercent24Hr).toFixed(2)}%</td>
                <td>{Number(asset.marketCapUsd).toFixed(2)}</td>
                <td>
                  <button>Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {/* Пагинационные кнопки */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Назад
        </button>
        <p>
          Страница {currentPage} из {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Вперёд
        </button>
      </div>
    </div>
  );
};

export default CoinsTable