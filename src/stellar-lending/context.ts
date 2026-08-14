import type {
  StellarAssetListItem,
  StellarHubListItem,
  StellarReserveListItem,
  StellarSpokeListItem,
} from './list';

export type StellarReserveKey = string;

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
  assetDecimals: number;
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
  /** Raw asset-native i128 cap values used by governance builders. */
  supplyCap: string;
  borrowCap: string;
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
  /**
   * Spoke-asset `no_seize`: the reserve cannot be taken as liquidation
   * collateral. Gates only the seizure leg — supply/borrow/withdraw/repay stay
   * open, so a liquidator must exclude this reserve from expected proceeds or
   * the call reverts (`SpokeError::SpokeAssetSeizureHalted`).
   */
  noSeize: boolean;
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
  return `${spokeId}:${hubId}:${asset}`;
}
