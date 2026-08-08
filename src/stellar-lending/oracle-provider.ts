/**
 * Persistence / event shapes for the Stellar price-aggregator composable
 * oracle model (`config:asset_oracle`).
 *
 * Mirrors on-chain `PriceKey` + `AssetOracle` (`sources`, independence,
 * tolerance, sanity). `i128` → string; `u32/u64` → number. No Nest
 * decorators — api-v2 owns swagger DTOs; this package owns wire shapes.
 *
 * These are the NORMALIZED shapes, not what `scValToNative` hands back. Soroban
 * renders a payload-carrying enum variant as a `[variant, payload]` tuple and a
 * unit variant as a one-element `[variant]` tuple, with snake_case fields. The
 * indexer's decoders convert both into the object form below before persisting:
 *
 *   ["AquariusLp", { key_a, … }] → { AquariusLp: { keyA, … } }
 *   ["RequireDisjoint"]          → 'RequireDisjoint'
 *
 * Anything assigning raw `scValToNative` output to these types is a bug — the
 * shapes differ and a type assertion will hide it.
 */

/** On-chain `PriceKey`: Token SAC or registry-only Ref symbol. */
export type StellarPriceKey =
  | { Token: string }
  | { Ref: string };

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

/** On-chain `MultiFeedRef`, shared by the RedStone and Xoxno legs. */
export interface StellarMultiFeedRef {
  contract: string;
  feedId: string;
  nature: StellarFeedNature;
}

/**
 * On-chain `ProviderRef`. The provider kind IS the variant — RedStone and Xoxno
 * both carry a `MultiFeedRef`, and are told apart by which key is present.
 */
export type StellarProviderRef =
  | { Reflector: StellarReflectorFeedRef }
  | { RedStone: StellarMultiFeedRef }
  | { Xoxno: StellarMultiFeedRef };

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

/**
 * On-chain `AquariusLpSource` — prices an Aquarius LP share token from its two
 * reserve legs. `plane` is the pool-info contract the aggregator reads reserves
 * from; `minPoolValueWad` is the liquidity floor below which the source is
 * rejected.
 */
export interface StellarAquariusLpSource {
  pool: string;
  plane: string;
  tokenA: string;
  tokenB: string;
  keyA: StellarPriceKey;
  keyB: StellarPriceKey;
  reserveADecimals: number;
  reserveBDecimals: number;
  minPoolValueWad: string;
}

/**
 * On-chain `PriceSource`. Both Aquarius variants carry an `AquariusLpSource`;
 * the stable variant differs only in the curve the aggregator prices against.
 */
export type StellarPriceSource =
  | { Feed: StellarFeedSource }
  | { Scaled: StellarScaledSource }
  | { AquariusLp: StellarAquariusLpSource }
  | { AquariusStableLp: StellarAquariusLpSource };

/**
 * On-chain `IndependencePolicy`. `AllowShared` carries the provider contract
 * addresses two legs are permitted to have in common.
 */
export type StellarIndependencePolicy =
  | 'RequireDisjoint'
  | { AllowShared: string[] };

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
