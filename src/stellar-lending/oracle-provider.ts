/**
 * TS mirror of the on-chain `controller::events::EventOracleProvider`. All
 * `i128` → string, `u32/u64` → number, `Option<T>` → `T | null`. Persistence
 * shape only (no swagger decorators); api-v2 owns the response DTOs.
 */
export interface StellarOracleProvider {
  baseTokenId: string;
  quoteTokenSymbol: string;
  toleranceUpperBps: number;
  toleranceLowerBps: number;
  pricingMethod: number;
  oracleType: number;
  strategy: number;
  assetDecimals: number;
  maxPriceStaleSeconds: number;
  primaryProvider: number;
  primaryContract: string;
  primaryAsset: string | null;
  primarySymbol: string | null;
  primaryFeedId: string | null;
  primaryQuoteToken: string | null;
  primaryReadMode: number;
  primaryTwapRecords: number;
  primaryDecimals: number;
  primaryResolutionSeconds: number;
  primaryMaxStaleSeconds: number;
  anchorProvider: number | null;
  anchorContract: string | null;
  anchorAsset: string | null;
  anchorSymbol: string | null;
  anchorFeedId: string | null;
  anchorQuoteToken: string | null;
  anchorReadMode: number;
  anchorTwapRecords: number;
  anchorDecimals: number;
  anchorResolutionSeconds: number;
  anchorMaxStaleSeconds: number;
  minSanityPriceWad: string;
  maxSanityPriceWad: string;
}
