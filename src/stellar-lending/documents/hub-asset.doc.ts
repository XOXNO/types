import { StellarLendingDataType } from '../enums';

/**
 * Liquidity truth for one asset on one hub (`hubAsset:{hubId}:{asset}`). IRM +
 * state + derived APY/utilization are event-sourced from the pool contract.
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
  supplied = '0';
  borrowed = '0';
  revenue = '0';
  suppliedShort = 0;
  borrowedShort = 0;
  cashShort = 0;
  supplyApy = 0;
  borrowApy = 0;
  utilization = 0;
  supplyCap = '0';
  borrowCap = '0';
  supplyCapShort = 0;
  borrowCapShort = 0;
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
