import type {
  StellarAssetListItem,
  StellarHubListItem,
  StellarReserveListItem,
  StellarSpokeListItem,
} from './list';

export type StellarReserveKey = `${number}:${number}:${string}`;

export interface StellarReserveKeyInput {
  spokeId: number;
  hubId: number;
  asset: string;
}

export interface StellarReserveIrmCurve {
  baseRateRay: string;
  slope1Ray: string;
  slope2Ray: string;
  slope3Ray: string;
  optimalUtilizationRay: string;
  midUtilizationRay: string;
  maxUtilizationRay: string;
  maxBorrowRateRay: string;
  reserveFactorBps: number;
}

export interface StellarReserveDetailItem {
  spokeId: number;
  hubId: number;
  asset: string;
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
  supplyCapShort: number;
  borrowCapShort: number;
  depositCapFilledPct: number;
  borrowCapFilledPct: number;
  isFlashloanable: boolean;
  flashloanFeeBps: number;
  liveSupplyIndexRay: string;
  liveBorrowIndexRay: string;
  collateralFactorBps: number;
  liquidationThresholdBps: number;
  liquidationPenaltyBps: number;
  liquidationFeesBps: number;
  isCollateralizable: boolean;
  isBorrowable: boolean;
  paused: boolean;
  frozen: boolean;
  useAsCollateral: boolean;
  targetHealthFactorWad: string;
  healthFactorForMaxBonusWad: string;
  liquidationBonusFactorBps: number;
  irm: StellarReserveIrmCurve;
  supportedCollateral: string[];
  borrowable: string[];
}

export interface StellarLendingContext {
  assets: StellarAssetListItem[];
  hubs: StellarHubListItem[];
  spokes: StellarSpokeListItem[];
  reserves: StellarReserveListItem[];
  reserveDetailsByKey: Record<string, StellarReserveDetailItem | null>;
}

export type StellarLendingContextDto = StellarLendingContext;

export function stellarReserveKey({
  spokeId,
  hubId,
  asset,
}: StellarReserveKeyInput): StellarReserveKey {
  return `${spokeId}:${hubId}:${asset}` as StellarReserveKey;
}
