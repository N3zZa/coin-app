import {Button} from 'components/Button/Button';
import { CoinsContext } from 'context/CoinsContext';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AssetItemModel } from 'types/AssetItemModel';
import AddInput from 'components/AddInput/AddInput';

type ModalProps = {
  coinName: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  asset: AssetItemModel;
};

const AddCoinModal = ({ asset, coinName, setIsOpen, isOpen }: ModalProps) => {
  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('CoinsContext используется вне CoinsProvider');
  }

  const { addPortfolioItem } = context;

  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('1');

  const handleCloseModal = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen],
  );

  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();


  const handleAddClick = (e: React.MouseEvent) => {
    if (inputValue === "") return
    e.stopPropagation()
    const newAsset: AssetItemModel = {
      id: asset.id,
      rank: asset.rank,
      symbol: asset.symbol,
      name: asset.name,
      supply: asset.supply,
      maxSupply: asset.maxSupply,
      marketCapUsd: asset.marketCapUsd,
      volumeUsd24Hr: asset.volumeUsd24Hr,
      priceUsd: asset.priceUsd * Number(inputValue),
      changePercent24Hr: asset.changePercent24Hr,
      vwap24Hr: asset.vwap24Hr,
      amount: Number(inputValue),
    };
    addPortfolioItem(newAsset, Number(inputValue));
    setIsOpen(false);
    setInputValue('1');
  };

    const handleOutsideClick = useCallback(
      (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          handleCloseModal();
        }
      },
      [handleCloseModal],
    );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('mouseup', handleOutsideClick);
    } else {
      document.body.style.overflow = '';
      setInputValue('1');
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleOutsideClick);
      document.addEventListener('mouseup', handleOutsideClick);
      setInputValue('1');
    };
  }, [isOpen, handleOutsideClick]);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-1 pointer-events-auto"></div>
      <div
        id='addcoinmodal'
        onClick={handleModalClick}
        ref={modalRef}
        className="fixed max-w-full w-[95%] sm:w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0A101A] border border-[#41403E] rounded-xl p-4 pointer-events-auto"
      >
        <div onClick={handleModalClick} className="max-h-[400px] overflow-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Введите количество {coinName}</h1>
            <Button id={"closebtn"} onClick={handleCloseModal} className="w-fit text-sm ml-auto" variant="gray">
              Close
            </Button>
          </div>
          <div>
            <AddInput
              coinPrice={asset.priceUsd}
              minAmount={1}
              maxAmount={100000}
              className="my-2"
              value={inputValue}
              onChange={setInputValue}
              type="number"
            />
            <Button onClick={handleAddClick} className="w-fit mx-auto" variant="blue">
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCoinModal;
