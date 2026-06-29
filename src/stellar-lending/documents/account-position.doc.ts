import { StellarLendingDataType } from '../enums';

export interface StellarInitialPaymentMultiplier {
  initialPaymentAmount: string;
  initialPaymentToken: string;
  usdValue: string;
}

/**
 * One account's position in one reserve (`account:{accountId}:{hubId}:{asset}`).
 * Partitioned by `accountId` so a full account loads single-partition. Entry
 * risk params are snapshotted at open time.
 */
export class StellarAccountPositionDoc {
  dataType = StellarLendingDataType.ACCOUNT_POSITION;
  accountId!: string;
  owner!: string;
  spokeId = 0;
  positionMode = 0;
  hubId!: number;
  asset!: string;
  supplyScaledRay = '0';
  borrowScaledRay = '0';
  supplyIndexRay: string | null = null;
  borrowIndexRay: string | null = null;
  entryLtvBps = 0;
  entryLiquidationThresholdBps = 0;
  entryLiquidationBonusBps = 0;
  entryLiquidationFeesBps = 0;
  initialPaymentMultiplier: StellarInitialPaymentMultiplier | null = null;
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarAccountPositionDoc>) {
    Object.assign(this, props);
    this.pk = this.accountId;
    this.id = `account:${this.accountId}:${this.hubId}:${this.asset}`;
  }
}
