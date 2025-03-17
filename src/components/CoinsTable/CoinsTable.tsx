import CircleLoader from 'components/CircleLoader/CircleLoader';
import { useState } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import AssetItem from 'components/AssetItem/AssetItem';

type CoinsTableProps = {
  assets: AssetItemModel[];
  loading:boolean;
};

const CoinsTable = ({ assets, loading }:CoinsTableProps) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Количество элементов на странице

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(assets.length / itemsPerPage);

  // Данные текущей страницы
  const currentData = assets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div id="coinsTable" className="max-w-full mx-auto relative">
      <table className="w-full max-h-[500px] h-full overflow-auto border-collapse text-left">
        <thead className="text-left">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap(USD)</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="max-h-[400px] h-[80px] min-h-[300px] overflow-auto">
          {loading ? (
            <tr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <td>
                <CircleLoader />
              </td>
            </tr>
          ) : (
            currentData.map((asset, index) => (
              <AssetItem
                key={asset.id}
                asset={asset}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                index={index}
              />
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="btn-gray">
          &lt;-
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="btn-gray">
          -&gt;
        </button>
      </div>
    </div>
  );
};

export default CoinsTable;
