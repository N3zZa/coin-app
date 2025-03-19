import AddCoinModal from 'components/AddCoinModal/AddCoinModal';
import Button from 'components/Button/Button';
import { CoinsContext } from 'context/CoinsContext';
import { routesPaths } from 'pages/routes';
import React, { useContext, useState } from 'react';
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

  const { removePortfolioCoin } = context;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenModal(true)
  };

  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removePortfolioCoin(asset.id);
  };

  return (
    <>
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
        <td>
          <AddCoinModal asset={asset} isOpen={isOpenModal} setIsOpen={setIsOpenModal} coinName={asset.name} />
          {asset.amount ? (
            <Button variant="blue" onClick={handleRemoveClick}>
               Delete({asset.amount})
            </Button>
          ) : (
            <Button variant="blue" onClick={handleAddClick}>
              Add
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};

export default AssetItem;
