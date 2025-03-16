import { FavoritesContext } from 'context/FavoritesContext';
import { routesPaths } from 'pages/routes';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AssetItemModel } from 'types/AssetItemModel';

type Props = {
  asset: AssetItemModel;
  currentPage: number;
  itemsPerPage: number;
  index: number;
};

const AssetItem = ({ asset, currentPage, itemsPerPage, index }: Props) => {
  const context = useContext(FavoritesContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('FavoritesContext используется вне FavoritesProvider');
  }

  const { toggleFavorite, isFavorite } = context;

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>, asset: AssetItemModel) => {
    event.stopPropagation(); // Останавливает всплытие клика
    toggleFavorite(asset);
  };

  return (
    <tr
      onClick={() => navigate(`${routesPaths.coin}${asset.id}`)}
      key={asset.id}
      className="items-center border-y-[1px] border-[#41403E] h-[80px] hover:bg-[#1B1E27] cursor-pointer"
    >
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>
        <div className="flex items-center gap-2 m-auto">
          <img
            width={30}
            src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
            alt="icon"
          />
          <p>{asset.name}</p>
          <span className="opacity-50">{asset.symbol}</span>
        </div>
      </td>
      <td>${Number(asset.priceUsd)}</td>
      <td>{Number(asset.changePercent24Hr)}%</td>
      <td>${Number(asset.marketCapUsd)}</td>
      {isFavorite(asset.id) ? (
        <td>
          <button
            onClick={(e) => handleAddClick(e, asset)}
            className="px-4 py-2 bg-[#0326A9] hover:bg-[#05259E] rounded cursor-pointer"
          >
            remove
          </button>
        </td>
      ) : (
        <td>
          <button
            onClick={(e) => handleAddClick(e, asset)}
            className="px-4 py-2 bg-[#0326A9] hover:bg-[#05259E] rounded cursor-pointer"
          >
            Add
          </button>
        </td>
      )}
    </tr>
  );
};

export default AssetItem;
