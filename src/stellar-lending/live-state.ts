import type { ActivityChain } from '../enums/common.enum';

/**
 * Live controller `MarketIndexView` for one hub market, plus client short
 * scales. `hubId` is client-attached (view has no hub field).
 *
 * Price legs: `usdPrice` = final composed answer; `primaryPriceUsd` /
 * `anchorPriceUsd` = independent oracle legs (equal under single-source).
 */
export interface StellarMarketIndexByHub {
  hubId: number;
  asset: string;
  supplyIndex: string;
  supplyIndexShort: number;
  borrowIndex: string;
  borrowIndexShort: number;
  /** Final composed USD WAD (`price_wad`). */
  usdPrice: string;
  usdPriceShort: number;
  /** First independent oracle leg WAD (`primary_price_wad`). */
  primaryPriceUsd: string;
  primaryPriceUsdShort: number;
  /**
   * Second independent oracle leg WAD (`anchor_price_wad`).
   * Equals primary under single-source configs.
   */
  anchorPriceUsd: string;
  anchorPriceUsdShort: number;
  /** Freshness timestamp of the final blend (seconds). Optional on live-state. */
  priceTimestamp?: number;
  stale?: boolean;
  deviation?: boolean;
  /** True when the price would pass the fail-closed solvency path. */
  valid?: boolean;
  chain: ActivityChain;
}

/**
 * Full soft-status market row from controller `get_market_indexes_detailed`
 * (api-v2 `/stellar-lending/detailed-markets`). Same price legs as
 * `MarketIndexView` with required validity flags.
 */
export interface StellarDetailedMarketDto {
  hubId: number;
  asset: string;
  supplyIndex: string;
  supplyIndexShort: number;
  borrowIndex: string;
  borrowIndexShort: number;
  usdPrice: string;
  usdPriceShort: number;
  /** First independent oracle leg (`primary_price_wad`). */
  primaryPriceUsd: string;
  primaryPriceUsdShort: number;
  /** Second independent oracle leg (`anchor_price_wad`). */
  anchorPriceUsd: string;
  anchorPriceUsdShort: number;
  priceTimestamp: number;
  stale: boolean;
  deviation: boolean;
  valid: boolean;
  chain: ActivityChain;
}

/** Live controller state needed by Stellar lending clients. */
export interface StellarLendingLiveStateDto {
  indexes: StellarMarketIndexByHub[];
  /** Raw 18-decimal WAD returned by `get_min_borrow_collateral_usd`. */
  minBorrowCollateralUsdWad: string | null;
}
