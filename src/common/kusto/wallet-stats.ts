import { ActivityChain } from '../enums';

export interface PriceData {
  price: number;
  usdValue: number;
  timestamp: number;
  identifier: string;
  txHash: string;
}

export class WalletTradingStats {
  wallet!: string;
  totalVolume!: number;
  totalTrades!: number;
  totalCollections!: number;
  totalNfts!: number;
  totalPartners!: number;
  buyerVolume!: number;
  buyerTrades!: number;
  buyerNfts!: number;
  buyerCollections!: number;
  buyerPartners!: number;
  buyerMaxPrice!: number;
  buyerMinPrice!: number;
  buyerMaxPriceData!: PriceData | null;
  buyerMinPriceData!: PriceData | null;
  sellerVolume!: number;
  sellerTrades!: number;
  sellerNfts!: number;
  sellerCollections!: number;
  sellerPartners!: number;
  sellerMaxPrice!: number;
  sellerMinPrice!: number;
  sellerMaxPriceData!: PriceData | null;
  sellerMinPriceData!: PriceData | null;
  chain!: ActivityChain;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.wallet = data.Address;
    this.totalVolume = data.TotalVolume;
    this.totalTrades = data.TotalTrades;
    this.totalCollections = data.TotalCollections;
    this.totalNfts = data.TotalNfts;
    this.totalPartners = data.TotalPartners;
    this.buyerVolume = data.BuyerVolume;
    this.buyerTrades = data.BuyerTrades;
    this.buyerNfts = data.BuyerNfts;
    this.buyerCollections = data.BuyerCollections;
    this.buyerPartners = data.BuyerPartners;
    this.buyerMaxPriceData =
      data.BuyerMaxPriceData !== null
        ? {
            price: data.BuyerMaxPriceData?.Price ?? null,
            timestamp: data.BuyerMaxPriceData?.Timestamp ?? null,
            identifier: data.BuyerMaxPriceData?.Identifier ?? null,
            txHash: data.BuyerMaxPriceData?.TxHash ?? null,
            usdValue: data.BuyerMaxPriceData?.UsdValue ?? null,
          }
        : null;
    this.buyerMinPriceData =
      data.BuyerMinPriceData !== null
        ? {
            price: data.BuyerMinPriceData?.Price ?? null,
            timestamp: data.BuyerMinPriceData?.Timestamp ?? null,
            identifier: data.BuyerMinPriceData?.Identifier ?? null,
            txHash: data.BuyerMinPriceData?.TxHash ?? null,
            usdValue: data.BuyerMinPriceData?.UsdValue ?? null,
          }
        : null;
    this.sellerVolume = data.SellerVolume;
    this.sellerTrades = data.SellerTrades;
    this.sellerNfts = data.SellerNfts;
    this.sellerCollections = data.SellerCollections;
    this.sellerPartners = data.SellerPartners;
    this.sellerMaxPriceData =
      data.SellerMaxPriceData !== null
        ? {
            price: data.SellerMaxPriceData?.Price ?? null,
            timestamp: data.SellerMaxPriceData?.Timestamp ?? null,
            identifier: data.SellerMaxPriceData?.Identifier ?? null,
            txHash: data.SellerMaxPriceData?.TxHash ?? null,
            usdValue: data.SellerMaxPriceData?.UsdValue ?? null,
          }
        : null;
    this.sellerMinPriceData =
      data.SellerMinPriceData !== null
        ? {
            price: data.SellerMinPriceData?.Price ?? null,
            timestamp: data.SellerMinPriceData?.Timestamp ?? null,
            identifier: data.SellerMinPriceData?.Identifier ?? null,
            txHash: data.SellerMinPriceData?.TxHash ?? null,
            usdValue: data.SellerMinPriceData?.UsdValue ?? null,
          }
        : null;
    this.chain = data.chain ?? ActivityChain.MVX;
  }
}
