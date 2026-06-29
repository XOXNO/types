import { StellarLendingDataType } from '../enums';
import type { StellarOracleProvider } from '../oracle-provider';

export class StellarAssetDoc {
  dataType = StellarLendingDataType.ASSET;
  asset!: string;
  symbol!: string;
  name!: string;
  decimals!: number;
  oracleProvider: StellarOracleProvider | null = null;
  usdPriceWad = '0';
  usdPriceShort = 0;
  totalDepositsUsd = '0';
  totalBorrowsUsd = '0';
  availableLiquidityUsd = '0';
  hubCount = 0;
  reserveCount = 0;
  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarAssetDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = `asset:${this.asset}`;
  }
}
