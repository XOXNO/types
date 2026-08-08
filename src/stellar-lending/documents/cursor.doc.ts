import { StellarLendingDataType } from '../enums';

export class StellarLendingCursorDoc {
  dataType = StellarLendingDataType.CURSOR;
  lastLedger = 0;
  lastPagingToken: string | null = null;
  /**
   * Watch set the cursor position belongs to. A position is only valid for the
   * exact set of contracts it was recorded against: any of them being
   * redeployed or repointed leaves that contract's setup events behind the
   * stored position, and the cursor only moves forward, so resuming would skip
   * them permanently. The indexer discards a mismatched cursor and reseeds from
   * the configured start ledger.
   *
   * Binding on the controller alone is what let a price-aggregator repoint slip
   * through and leave every `StellarAssetDoc.oracleProvider` null.
   */
  controllerAddress: string | null = null;
  poolAddress: string | null = null;
  priceAggregatorAddress: string | null = null;
  governanceAddress: string | null = null;
  /**
   * Decode-logic version. Bumping it discards the cursor and replays everything
   * within RPC retention, so a decoder fix reaches already-indexed events.
   */
  indexerVersion: string | null = null;
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
