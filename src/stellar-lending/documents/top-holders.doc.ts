import { StellarLendingDataType } from '../enums';

export interface StellarTopHolder {
  owner: string;
  accountId: string;
  scaledRay: string;
  amountShort: number;
  sharePct: number;
}

export class StellarTopHoldersDoc {
  dataType = StellarLendingDataType.TOP_HOLDERS;
  spokeId!: number;
  hubId!: number;
  asset!: string;
  side!: 'deposits' | 'borrows';
  totalScaledRay = '0';
  holders: StellarTopHolder[] = [];
  updatedAt = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarTopHoldersDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `topHolders:${this.spokeId}:${this.hubId}:${this.asset}:${this.side}`;
  }
}
