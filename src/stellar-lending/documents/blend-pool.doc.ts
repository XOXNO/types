import { StellarLendingDataType } from '../enums';
import { stellarLendingPartitionKey } from '../network';
import type { StellarNetwork } from '../network';

/**
 * Approval state for one Blend pool, event-sourced from
 * `config:approve_blend_pool`.
 *
 * Approval gates whether positions may migrate into that pool, so the row is
 * kept after revocation with `approved: false` rather than deleted — a pool that
 * was once approved and is no longer is materially different from one that never
 * was, and the difference matters when auditing a migration after the fact.
 */
export class StellarBlendPoolDoc {
  dataType = StellarLendingDataType.BLEND_POOL;
  network!: StellarNetwork;

  /** Blend pool contract address. Also the `id` suffix. */
  pool!: string;
  approved = false;

  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarBlendPoolDoc>) {
    Object.assign(this, props);
    this.pk = stellarLendingPartitionKey(this.network, this.dataType);
    this.id = `blendPool:${this.pool}`;
  }
}
