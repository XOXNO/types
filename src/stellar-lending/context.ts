import type {
  StellarAssetListItem,
  StellarAssetPageMarket,
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

export interface StellarReserveDetailItem extends StellarAssetPageMarket {
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
