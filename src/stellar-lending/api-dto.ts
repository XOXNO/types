import type {
  StellarAssetListItem,
  StellarAssetPage,
  StellarAssetPageMarket,
  StellarHubListItem,
  StellarReserveListItem,
  StellarSpokeListItem,
  StellarUserActivityItem,
} from './list';

export type StellarAssetListItemDto = StellarAssetListItem;
export type StellarHubListItemDto = StellarHubListItem;
export type StellarSpokeListItemDto = StellarSpokeListItem;
export type StellarReserveListItemDto = StellarReserveListItem;
export type AssetDto = Omit<
  StellarAssetPage,
  'depositMarkets' | 'borrowMarkets' | 'graphSeries'
>;
export type AssetPageDto = StellarAssetPage;
export type AssetMarketDto = StellarAssetPageMarket;

export interface ReserveDto extends StellarAssetPageMarket {
  supplyCapShort: number;
  borrowCapShort: number;
  isFlashloanable: boolean;
  flashloanFeeBps: number;
  liquidationPenaltyBps: number;
  liquidationFeesBps: number;
  useAsCollateral: boolean;
  targetHealthFactorWad: string;
  healthFactorForMaxBonusWad: string;
  liquidationBonusFactorBps: number;
}

export interface HubDto {
  hubId: number;
  isActive: boolean;
  name: string | null;
  totalDepositsUsd: number;
  totalBorrowsUsd: number;
  availableLiquidityUsd: number;
  assetCount: number;
  connectedSpokeCount: number;
  assets: unknown[];
}

export interface SpokeDto {
  spokeId: number;
  isDeprecated: boolean;
  name: string | null;
  totalDepositsUsd: number;
  totalBorrowsUsd: number;
  assetCount: number;
  connectedHubIds: number[];
  connectedHubCount: number;
  markets: unknown[];
}

export interface TopHoldersDto {
  side: string;
  holders: number;
  totalUsd: number;
  avgUsd: number;
  medianUsd: number;
  p90Usd: number;
  top1Usd: number;
  top10Usd: number;
  top1SharePct: number;
  top10SharePct: number;
}

export interface AccountPositionsDto {
  positions: unknown[];
}

export type StellarUserActivityItemDto = StellarUserActivityItem;

export interface MarketGraphDto {
  points: unknown[];
  fees?: unknown[];
}

export interface SpokeGraphDto {
  spokeId: number;
  points: unknown[];
}

export interface StellarStatsHistoryDto {
  timestamps: string[];
  supplied: number[];
  borrowed: number[];
  revenue: number[];
}

export interface StellarPositionsPnlDto {
  accountId?: string;
  positions?: unknown[];
  rows?: unknown[];
}

export interface StellarPositionsRankDto {
  rows: unknown[];
}

export interface UserHistoryDto {
  accountId: string;
  points: unknown[];
}

export interface PnlByScopeDto {
  rows: unknown[];
}

export interface RevenueSeriesDto {
  points: unknown[];
}

export interface FeeRevenueSeriesDto {
  points: unknown[];
}

export interface ParticipantCountsDto {
  suppliers: number;
  borrowers: number;
  total: number;
}

export interface LiquidationsSeriesDto {
  points: unknown[];
}

export interface LiquidationsLeaderboardDto {
  liquidators: unknown[];
}

export interface VolumeSeriesDto {
  points: unknown[];
}

export interface ActiveUsersSeriesDto {
  points: unknown[];
}

export interface HolderDistributionDto {
  side: string;
  holders: number;
  totalUsd: number;
}

export interface RateSpreadSeriesDto {
  points: unknown[];
}

export interface DefiLlamaDimensionsDto {
  protocol: string;
  chain: string;
  version: string;
}
