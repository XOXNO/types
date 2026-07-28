/**
 * Persistence / event shapes for the Stellar price-aggregator composable
 * oracle model (`config:asset_oracle`).
 *
 * Mirrors on-chain `PriceKey` + `AssetOracle` (`sources`, independence,
 * tolerance, sanity). `i128` → string; `u32/u64` → number. No Nest
 * decorators — api-v2 owns swagger DTOs; this package owns wire shapes.
 */

/** On-chain `PriceKey`: Token SAC or registry-only Ref symbol. */
export type StellarPriceKey =
  | { Token: string }
  | { Ref: string };

/** On-chain `ProviderKind`. */
export type StellarProviderKind = 'Reflector' | 'RedStone' | 'Xoxno';

/** On-chain `FeedNature`. */
export type StellarFeedNature = 'Market' | 'Fundamental';

/** On-chain `OracleAssetRef` for Reflector legs. */
export type StellarOracleAssetRef =
  | { Stellar: string }
  | { Symbol: string }
  | { String: string };

/** On-chain `OracleReadMode`. */
export type StellarOracleReadMode = 'Spot' | { Twap: number };

/** On-chain `OracleTolerance` (BPS band around 10000). */
export interface StellarOracleTolerance {
  upperRatioBps: number;
  lowerRatioBps: number;
}

export interface StellarReflectorFeedRef {
  contract: string;
  asset: StellarOracleAssetRef;
  readMode: StellarOracleReadMode;
}

export interface StellarMultiFeedRef {
  contract: string;
  feedId: string;
  kind: StellarProviderKind;
  nature: StellarFeedNature;
}

/** On-chain `ProviderRef`. */
export type StellarProviderRef =
  | { Reflector: StellarReflectorFeedRef }
  | { MultiFeed: StellarMultiFeedRef };

export interface StellarFeedSource {
  provider: StellarProviderRef;
  decimals: number;
  maxStaleSeconds: number;
}

export interface StellarScaledSource {
  factor: StellarFeedSource;
  quote: StellarPriceKey;
  minFactorWad: string;
  maxFactorWad: string;
}

export type StellarPoolKind = 'ConstantProduct';

export interface StellarLpShareSource {
  pool: string;
  kind: StellarPoolKind;
  keyA: StellarPriceKey;
  keyB: StellarPriceKey;
  reserveADecimals: number;
  reserveBDecimals: number;
  shareDecimals: number;
}

/** On-chain `PriceSource`. */
export type StellarPriceSource =
  | { Feed: StellarFeedSource }
  | { Scaled: StellarScaledSource }
  | { LpShare: StellarLpShareSource };

export interface StellarTrustDomain {
  kind: StellarProviderKind;
  contract: string;
}

/** On-chain `IndependencePolicy`. */
export type StellarIndependencePolicy =
  | 'RequireDisjoint'
  | { AllowShared: StellarTrustDomain[] };

/**
 * On-chain `AssetOracle` — one or two independent opinions for a `PriceKey`.
 * Stored on `StellarAssetDoc.oracleProvider` and carried by
 * `config:asset_oracle` events.
 */
export interface StellarAssetOracle {
  assetDecimals: number;
  maxPriceStaleSeconds: number;
  sources: StellarPriceSource[];
  tolerance: StellarOracleTolerance;
  independence: StellarIndependencePolicy;
  minSanityPriceWad: string;
  maxSanityPriceWad: string;
}

/**
 * @deprecated Alias of {@link StellarAssetOracle}. Prefer `StellarAssetOracle`.
 * Kept so existing imports continue to resolve while consumers migrate off the
 * v1 primary/anchor flat projection.
 */
export type StellarOracleProvider = StellarAssetOracle;
