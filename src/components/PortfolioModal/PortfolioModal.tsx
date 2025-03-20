import { fetchFavorites } from 'api/fetchFavorites';
import Button from 'components/Button/Button';
import CoinsTable from 'components/CoinsTable/CoinsTable';
import { CoinsContext } from 'context/CoinsContext';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import { PortfolioCoinsId } from 'types/PortfolioCoinsIdModel';

type ModalProps = {
  title: string;
  coins?: PortfolioCoinsId[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

const PortfolioModal = ({ title, coins, setIsOpen, isOpen }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('Coins context error in modal');
  }

  const { clearPortfolio, portfolioCoinsId } = context;

  const [assets, setAssets] = useState<AssetItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (coins) {
      fetchFavorites({ favorites: coins, setAssets, setError, setLoading });
    }
  }, [coins]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  
  const handleClearPortfolio = () => {
    clearPortfolio();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Возвращаем скролл при размонтировании
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCloseModal]);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-1 pointer-events-auto"></div>
      <div
        id='portfolioModal'
        ref={modalRef}
        className="fixed max-w-full w-[98%] sm:w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0A101A] border border-[#41403E] rounded-xl p-4 pointer-events-auto"
      >
        {error ? (
          <div className="flex flex-col mx-auto max-w-fit mt-10 gap-4">
            <h1 className="text-2xl">Too many requests. Try again later.</h1>
            <Button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-[#0326A9] hover:bg-[#05259E] rounded cursor-pointer w-fit mx-auto"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{title}</h1>
              {portfolioCoinsId.length > 0 && <Button onClick={handleClearPortfolio}>Clear</Button>}
            </div>
            {assets.length === 0 || (portfolioCoinsId.length === 0 && !loading) ? (
              <div className="flex flex-col mx-auto max-w-fit mt-10 gap-4">
                <h1 className="text-2xl">You haven't added anything to portfolio</h1>
                <Button onClick={handleCloseModal} className="w-fit mx-auto" variant="blue">
                  Close
                </Button>
              </div>
            ) : (
              <CoinsTable assets={assets} loading={loading} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioModal;
