import React, { useContext, useState } from 'react';
import favoriteImg from 'assets/fav.svg';
import homeImg from 'assets/home.svg';
import { Link } from 'react-router';
import CircleLoader from 'components/CircleLoader/CircleLoader';
import Button from 'components/Button/Button';
import { CoinsContext } from 'context/CoinsContext';
import PortfolioModal from 'components/PortfolioModal/PortfolioModal';
import PortfolioInfo from 'components/PortfolioInfo/PortfolioInfo';

const Header: React.FC = () => {
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
    <header className="p-4">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <img width={30} src={homeImg} alt="home" />
        </Link>
        <nav>
          <ul className="flex items-center gap-3">
            {error && <div className="text-red-500">{error}</div>}
            {loading ? (
              <CircleLoader size={10} />
            ) : (
              assets.slice(0, 3).map((asset) => (
                <li className="flex items-center gap-1 border-[1px] border-[#343648] px-3 py-1" key={asset.id}>
                  <img
                    width={30}
                    src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                    alt={`${asset.name} icon`}
                  />
                  <p>
                    {asset.name} <span>${asset.priceUsd}</span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </nav>
        {isModalOpen && (
          <PortfolioModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} coins={portfolioCoinsId} title="Portfolio" />
        )}
        <Button onClick={handleModal} className="flex items-center gap-1" variant="gray">
          <PortfolioInfo onClick={() => setIsModalOpen(true)} />
          <img width={30} src={favoriteImg} alt="fav" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
