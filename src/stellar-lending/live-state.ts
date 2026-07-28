import type { ActivityChain } from '../enums/common.enum';

/**
 * Live controller `MarketIndexView` for one hub market, plus client short
 * scales. `hubId` is client-attached (view has no hub field); price legs keep
 * historical ABI names (`safe_price_wad` / `aggregator_price_wad`) as
 * primary/anchor short aliases for wire compatibility.
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
  /**
   * Primary/first oracle leg WAD (`safe_price_wad` — historical ABI name, not a
   * safety flag).
   */
  primaryPriceUsd: string;
  primaryPriceUsdShort: number;
  /**
   * Secondary/second oracle leg WAD (`aggregator_price_wad` — historical ABI
   * name, not the swap aggregator).
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
  /** Primary leg (`safe_price_wad`). */
  safePriceUsd: string;
  safePriceUsdShort: number;
  /** Secondary leg (`aggregator_price_wad`). */
  aggregatorPriceUsd: string;
  aggregatorPriceUsdShort: number;
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
