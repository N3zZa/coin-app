import Button from 'components/Button/Button';
import { CoinsContext } from 'context/coinsContext';
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
  const context = useContext(CoinsContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('CoinsContext используется вне CoinsProvider');
  }

  const { togglePortfolioItem, isInPortfolio } = context;

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>, asset: AssetItemModel) => {
    event.stopPropagation();
    togglePortfolioItem(asset);
  };

  return (
    <tr
      onClick={() => navigate(`${routesPaths.coin}${asset.id}`, { state: { id: asset.id } })}
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
      {isInPortfolio(asset.id) ? (
        <td>
          <Button variant="blue" onClick={(e) => handleAddClick(e, asset)}>
            remove
          </Button>
        </td>
      ) : (
        <td>
          <Button variant="blue" onClick={(e) => handleAddClick(e, asset)}>
            Add
          </Button>
        </td>
      )}
    </tr>
  );
};

export default AssetItem;
