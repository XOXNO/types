import { StellarLendingDataType } from '../enums';

/**
 * Liquidity truth for one asset on one hub (`hubAsset:{hubId}:{asset}`). IRM +
 * state + derived APY/utilization are event-sourced from the pool contract.
 * `suppliedScaledRay`/`borrowedScaledRay`/`revenueScaledRay` hold the RAY-scaled
 * shares straight from the event; multiply by the live supply/borrow index and
 * denominate on read to recover token amounts. `cash` is the plain token
 * base-unit balance (not index-scaled).
 */
export class StellarHubAssetDoc {
  dataType = StellarLendingDataType.HUB_ASSET;
  hubId!: number;
  asset!: string;
  assetDecimals = 0;
  marketAddress = '';
  maxBorrowRateRay = '0';
  baseBorrowRateRay = '0';
  slope1Ray = '0';
  slope2Ray = '0';
  slope3Ray = '0';
  midUtilizationRay = '0';
  optimalUtilizationRay = '0';
  maxUtilizationRay = '0';
  reserveFactorBps = 0;
  supplyIndexRay = '0';
  borrowIndexRay = '0';
  cash = '0';
  suppliedScaledRay = '0';
  borrowedScaledRay = '0';
  revenueScaledRay = '0';
  supplyApy = 0;
  borrowApy = 0;
  utilization = 0;
  isFlashloanable = false;
  flashloanFeeBps = 0;
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarHubAssetDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `hubAsset:${this.hubId}:${this.asset}`;
  }
}
