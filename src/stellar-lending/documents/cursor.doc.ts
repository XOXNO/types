import { StellarLendingDataType } from '../enums';

export class StellarLendingCursorDoc {
  dataType = StellarLendingDataType.CURSOR;
  lastLedger = 0;
  lastPagingToken: string | null = null;
  updatedAt = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarLendingCursorDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = 'cursor:stellar-lending';
  }
}
