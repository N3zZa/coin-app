import {CircleLoader} from 'components/CircleLoader/CircleLoader';
import {useEffect, useState } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import AssetItem from 'components/AssetItem/AssetItem';
import {Button} from 'components/Button/Button';
import SearchInput from './../SearchInput/SearchInput';

type CoinsTableProps = {
  assets: AssetItemModel[];
  loading:boolean;
};

type SortType = 'marketCap' | 'price' | 'volume' | null;

const CoinsTable = ({ assets, loading }:CoinsTableProps) => {

  const [currentPage, setCurrentPage] = useState(1);

  const [sortedAssets, setSortedAssets] = useState<AssetItemModel[]>(assets);
  const [activeSort, setActiveSort] = useState<SortType>(null);
  const [searchQuery,setSearchQuery] = useState<string>("");

  const itemsPerPage = 10; // Количество элементов на странице

  useEffect(() => {
    setSortedAssets(assets);
  }, [assets]);

    const filteredAssets = sortedAssets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
    const currentData = filteredAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

   const sortData = (type: SortType, compareFn: (a: AssetItemModel, b: AssetItemModel) => number) => {
     const sortedData = [...sortedAssets].sort(compareFn);
     setSortedAssets(sortedData);
     setActiveSort(type);
     setCurrentPage(1); 
   };

   const sortByMarketCap = () => sortData('marketCap', (a, b) => Number(b.marketCapUsd) - Number(a.marketCapUsd));
   const sortByPrice = () => sortData('price', (a, b) => Number(b.priceUsd) - Number(a.priceUsd));
   const sortBy24h = () => sortData('volume', (a, b) => Number(b.changePercent24Hr) - Number(a.changePercent24Hr));

  const getThClass = (type: SortType) => `cursor-pointer ${activeSort === type ? 'underline text-[#0326A9]' : ''}`;


  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div id="coinsTable" className="max-w-full mx-auto relative overflow-x-auto">
        <table className="w-full max-h-[500px] h-full overflow-auto border-collapse text-left">
          <thead className="text-left">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className={getThClass('price')} onClick={sortByPrice}>
                Price
              </th>
              <th className={getThClass('volume')} onClick={sortBy24h}>
                24h%
              </th>
              <th className={getThClass('marketCap')} onClick={sortByMarketCap}>
                Market Cap(USD)
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="relative max-h-[400px] h-[80px] min-h-[300px] overflow-auto">
            {loading ? (
              <tr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <td>
                  <CircleLoader size="large" />
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((asset, index) => (
                <AssetItem
                  key={asset.id}
                  asset={asset}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  index={index}
                />
              ))
            ) : (
              <div className="absolute text-2xl text-center w-fit mx-auto right-0 left-0 top-4 bottom-0">
                <h1>Nothing was found</h1>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {currentData.length === 10 && (
        <div className="flex justify-between mt-4">
          <Button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt;-
          </Button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <Button onClick={handleNext} disabled={currentPage === totalPages}>
            -&gt;
          </Button>
        </div>
      )}
    </>
  );
};

export default CoinsTable;
