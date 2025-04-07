import React, { useContext, useState } from 'react';
import homeImg from 'assets/home.svg';
import { Link } from 'react-router';
import {CircleLoader} from 'components/CircleLoader/CircleLoader';
import { CoinsContext } from 'context/CoinsContext';
import PortfolioModal from 'components/PortfolioModal/PortfolioModal';
import {PortfolioInfo} from 'components/PortfolioInfo/PortfolioInfo';

export const Header: React.FC = () => {
  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('Coin context error');
  }

  const { portfolioCoinsId, assets, loading, error } = context;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="flex flex-col gap-4 sm:p-4 py-4 px-0">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <img width={30} src={homeImg} alt="home" />
        </Link>

        {isModalOpen && (
          <PortfolioModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} coins={portfolioCoinsId} title="Portfolio" />
        )}
        <PortfolioInfo onClick={handleModal} />
      </div>{' '}
      <nav className='w-fit mx-auto'>
        <ul className="flex items-center gap-3">
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            <CircleLoader size={"small"} />
          ) : (
            assets.slice(0, 3).map((asset) => (
              <li
                className="flex items-center gap-1 border border-[#343648] px-3 py-1"
                key={asset.id}
              >
                <img
                  width={30}
                  src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                  alt={`${asset.name} icon`}
                />
                <p className="sm:block hidden"> {asset.name} </p>
                <span className="text-sm">${asset.priceUsd}</span>
              </li>
            ))
          )}
        </ul>
      </nav>
    </header>
  );
};

