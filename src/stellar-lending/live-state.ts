import type { ActivityChain } from '../enums/common.enum';

/** Live controller index for one Stellar `(hub, asset)` market. */
export interface StellarMarketIndexByHub {
  hubId: number;
  asset: string;
  supplyIndex: string;
  supplyIndexShort: number;
  borrowIndex: string;
  borrowIndexShort: number;
  usdPrice: string;
  usdPriceShort: number;
  primaryPriceUsd: string;
  primaryPriceUsdShort: number;
  anchorPriceUsd: string;
  anchorPriceUsdShort: number;
  chain: ActivityChain;
}

/** Live controller state needed by Stellar lending clients. */
export interface StellarLendingLiveStateDto {
  indexes: StellarMarketIndexByHub[];
  /** Raw 18-decimal WAD returned by `get_min_borrow_collateral_usd`. */
  minBorrowCollateralUsdWad: string | null;
}
