import React, { useContext, useEffect, useState } from 'react';
import { CoinsContext } from 'context/CoinsContext';

type Props = {
  onClick: () => void;
};

const PortfolioInfo: React.FC<Props> = ({ onClick }) => {
  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('CoinsContext is undefined');
  }

  const { portfolioPrice, initialPortfolioPrice, portfolioCoinsId } = context;

  const [priceDifference, setPriceDifference] = useState<number>(0);
  const [percentageDifference, setPercentageDifference] = useState<number>(0);

  useEffect(() => {
    if (portfolioPrice > 0 && portfolioCoinsId.length > 0) {
      const difference = portfolioPrice - initialPortfolioPrice;
      const percentage = (difference / portfolioPrice) * 100;
      setPriceDifference(difference);
      setPercentageDifference(percentage);
    }
  }, [portfolioPrice, initialPortfolioPrice, portfolioCoinsId.length]);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center gap-2 border px-3 py-2 rounded-xl hover:bg-gray-700"
    >
      <p>{initialPortfolioPrice.toFixed(2)} USD</p>
      {portfolioPrice > 0 && (
        <p className={`text-sm ${priceDifference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {priceDifference >= 0 ? '+' : ''}
          {priceDifference.toFixed(2)} USD ({percentageDifference.toFixed(2)}%)
        </p>
      )}
    </div>
  );
};

export default PortfolioInfo;
