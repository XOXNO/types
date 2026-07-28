import { StellarLendingDataType } from '../enums';
import type { StellarAssetOracle } from '../oracle-provider';

export class StellarAssetDoc {
  dataType = StellarLendingDataType.ASSET;
  asset!: string;
  symbol!: string;
  name!: string;
  decimals!: number;
  /**
   * Price-aggregator `AssetOracle` for `PriceKey::Token(asset)`, event-sourced
   * from `config:asset_oracle`. Null until first configure.
   */
  oracleProvider: StellarAssetOracle | null = null;
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
