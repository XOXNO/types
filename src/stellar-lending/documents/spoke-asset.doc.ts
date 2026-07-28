import { StellarLendingDataType } from '../enums';

/**
 * Risk truth for one asset in one spoke on one hub
 * (`spokeAsset:{spokeId}:{hubId}:{asset}`). LTV, liquidation params, flags, and
 * per-spoke usage are event-sourced from the controller contract.
 * Oracle config is asset-level on the price-aggregator (`StellarAssetDoc`), not
 * per-spoke — there is no on-chain `oracle_override`.
 */
export class StellarSpokeAssetDoc {
  dataType = StellarLendingDataType.SPOKE_ASSET;
  spokeId!: number;
  hubId!: number;
  asset!: string;
  isCollateralizable = false;
  isBorrowable = false;
  paused = false;
  frozen = false;
  loanToValueBps = 0;
  liquidationThresholdBps = 0;
  liquidationBonusBps = 0;
  liquidationFeesBps = 0;
  supplyCap = '0';
  borrowCap = '0';
  supplyCapShort = 0;
  borrowCapShort = 0;
  suppliedScaledRay = '0';
  borrowedScaledRay = '0';
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarSpokeAssetDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `spokeAsset:${this.spokeId}:${this.hubId}:${this.asset}`;
  }
}
