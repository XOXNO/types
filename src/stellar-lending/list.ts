/**
 * Global list-item contracts for the Stellar-lending read API. These are the
 * row shapes the SDK and UI consume for the Aave-V4 style Deposit/Borrow tables,
 * the All Hubs / All Markets pages, and global search. Persistence shape only
 * (no swagger decorators) — api-v2 owns the response DTOs.
 *
 * Unit conventions mirror the detail contracts: APY/utilization are decimals in
 * `[0,1]`, `*Usd` are USD numbers, `*Native` are human-readable token amounts
 * (live), and `*Bps` are basis points.
 */

/** `[min, max]` inclusive range. */
export type StellarApyRange = [min: number, max: number];

/**
 * One asset aggregated across every hub/market it lists on — a row in the
 * Deposit/Borrow asset tables. USD/native totals and APY ranges are summed/taken
 * over the asset's hub-assets at live indexes.
 */
export interface StellarAssetListItem {
  asset: string;
  symbol: string;
  name: string;
  decimals: number;
  /** Live spot USD price per whole unit. */
  price: number;
  totalDepositsUsd: number;
  /** Total supplied across hubs, human-readable token units (live). */
  totalDepositsNative: number;
  totalBorrowsUsd: number;
  /** Total borrowed across hubs, human-readable token units (live). */
  totalBorrowsNative: number;
  availableLiquidityUsd: number;
  /** `[min, max]` supply APY across the asset's hubs. */
  supplyApyRange: StellarApyRange;
  /** `[min, max]` borrow APY across the asset's hubs. */
  borrowApyRange: StellarApyRange;
  /** Number of hubs listing this asset. */
  hubCount: number;
  /** Number of reserves (spoke,hub) for this asset. */
  marketCount: number;
}

/** One (spoke, hub) market row for an asset detail page. */
export interface StellarAssetPageMarket {
  spokeId: number;
  hubId: number;
  asset: string;
  spokeName: string | null;
  hubName: string | null;
  supplyApy: number;
  borrowApy: number;
  utilization: number;
  suppliedShort: number;
  borrowedShort: number;
  availableLiquidityShort: number;
  usdPrice: number;
  depositsUsd: number;
  borrowsUsd: number;
  availableLiquidityUsd: number;
  collateralFactorBps: number;
  liquidationThresholdBps: number;
  isCollateralizable: boolean;
  isBorrowable: boolean;
  paused: boolean;
  frozen: boolean;
  supplyCapShort: number;
  borrowCapShort: number;
  depositCapFilledPct: number;
  borrowCapFilledPct: number;
  remainingSupplyCapacityUsd: number;
  remainingBorrowCapacityUsd: number;
  supportedCollateral: string[];
  borrowableAssets: string[];
  userSuppliedNative: number;
  userBorrowedNative: number;
  userSuppliedUsd: number;
  userBorrowedUsd: number;
  liveSupplyIndexRay: string;
  liveBorrowIndexRay: string;
}

export interface StellarAssetPageGraphPoint {
  timestamp: string;
  supplyApy: number;
  borrowApy: number;
  totalDepositsUsd: number;
  totalBorrowsUsd: number;
  suppliedNative: number;
  borrowedNative: number;
}

export interface StellarAssetPageGraphSeries {
  spokeId: number;
  hubId: number;
  spokeName: string | null;
  hubName: string | null;
  points: StellarAssetPageGraphPoint[];
}

/** One-call payload for the Stellar asset detail page. */
export interface StellarAssetPage {
  asset: string;
  symbol: string;
  name: string;
  decimals: number;
  usdPrice: number;
  totalDepositsUsd: number;
  totalBorrowsUsd: number;
  availableLiquidityUsd: number;
  hubCount: number;
  reserveCount: number;
  minSupplyApy: number;
  maxSupplyApy: number;
  minBorrowApy: number;
  maxBorrowApy: number;
  depositMarkets: StellarAssetPageMarket[];
  borrowMarkets: StellarAssetPageMarket[];
  graphSeries: StellarAssetPageGraphSeries[];
}

/** One hub aggregated over its hub-assets — a row in the All Hubs table. */
export interface StellarHubListItem {
  hubId: number;
  name: string | null;
  /** Total value locked (USD); equals total deposits. */
  tvlUsd: number;
  totalDepositsUsd: number;
  totalBorrowsUsd: number;
  /** Number of assets listed on the hub. */
  assetCount: number;
  /** Number of spokes connected to the hub. */
  spokeCount: number;
}

/** One spoke aggregated over its reserves — a row in the All Markets table. */
export interface StellarSpokeListItem {
  spokeId: number;
  name: string | null;
  /** Primary connected hub (`connectedHubIds[0]`); a spoke may span hubs. */
  hubId: number;
  /** Every hub connected to the spoke. */
  connectedHubIds: number[];
  /** Total value locked (USD); equals total deposits across reserves. */
  tvlUsd: number;
  totalBorrowsUsd: number;
  /** Number of assets configured in the spoke. */
  assetCount: number;
}

/**
 * One reserve — an asset in a spoke on a hub. Risk config (CF/threshold/flags)
 * is the spoke-asset truth; APY/utilization/liquidity/USD are the hub-asset
 * liquidity truth at live indexes. Capacity reflects the supply (deposit) cap.
 */
export interface StellarReserveListItem {
  spokeId: number;
  hubId: number;
  asset: string;
  symbol: string;
  decimals: number;
  supplyApy: number;
  borrowApy: number;
  /** Utilization rate in `[0,1]`. */
  utilizationRate: number;
  totalDepositsUsd: number;
  totalBorrowsUsd: number;
  availableLiquidityUsd: number;
  /** Supply (deposit) capacity filled, percentage `[0,100]`; 0 when uncapped. */
  capacityFilledPct: number;
  /** Remaining supply capacity valued in USD; 0 when uncapped. */
  remainingCapacityUsd: number;
  /** Collateral factor (LTV) in basis points. */
  collateralFactorBps: number;
  liquidationThresholdBps: number;
  /** Whether the asset can be used as collateral in this spoke. */
  useAsCollateral: boolean;
}

/**
 * One row in a user's lending action feed — a single position leg the user
 * performed, newest first. Sourced from `StellarLendingPositionActivity()`
 * filtered by `Owner`; `usd` is the action delta valued at the event-time
 * oracle price (`amountShort * oraclePrice`).
 */
export interface StellarUserActivityItem {
  /** Event time (ISO-8601). */
  timestamp: string;
  /** Monotonic event ordinal (`ledger * 1e6 + indexInLedger`); feed sort key. */
  seq: number;
  /** Action kind (supply/borrow/withdraw/repay/liqRepay/liqSeize/multiply/…). */
  action: string;
  /** Position side this leg mutated; `null` for non-position rows. */
  side: 'supply' | 'borrow' | null;
  /** Asset (token) contract address. */
  token: string;
  symbol: string;
  decimals: number;
  hubId: number;
  spokeId: number | null;
  reserveKey: string | null;
  /** Action delta this tx, human-readable token units. */
  amountShort: number | null;
  /** Action delta valued in USD at event-time oracle price. */
  usd: number;
  /** Liquidator (caller) address on liquidation legs; `null` otherwise. */
  liquidator: string | null;
}
