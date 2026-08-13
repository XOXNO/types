import { StellarLendingDataType } from '../enums';
import { stellarLendingPartitionKey } from '../network';
import type { StellarNetwork } from '../network';

/**
 * One access-control grant, event-sourced from `role_granted` / `role_revoked`.
 *
 * One document per `(contract, role, account)` rather than a roster array on the
 * contract: the set of accounts holding a role is externally influenced, so an
 * array would mean read-modify-write on every event — a lost-update race between
 * concurrent ticks — and unbounded document growth. As separate rows each event
 * is a blind idempotent upsert.
 *
 * Revocation flips `granted` to `false` rather than deleting the row, so the
 * grant history stays queryable and a revoke arriving before its grant (replay,
 * out-of-order paging) cannot resurrect a stale `true`.
 */
export class StellarContractRoleDoc {
  dataType = StellarLendingDataType.CONTRACT_ROLE;
  network!: StellarNetwork;

  /** Contract whose access control this grant belongs to. */
  contractAddress!: string;
  /** On-chain role symbol, e.g. `ORACLE`, `PROPOSER`. */
  role!: string;
  /** Account holding (or formerly holding) the role. */
  account!: string;
  granted = false;
  /** Account that performed the grant or revoke. */
  caller: string | null = null;

  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarContractRoleDoc>) {
    Object.assign(this, props);
    this.pk = stellarLendingPartitionKey(this.network, this.dataType);
    this.id = `contractRole:${this.contractAddress}:${this.role}:${this.account}`;
  }
}
