export type AssetItemModel = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: number;
  volumeUsd24Hr: string;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: string;
  amount?: number;
};