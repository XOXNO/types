import { StellarLendingDataType } from '../enums';
import { stellarLendingPartitionKey } from '../network';
import type { StellarNetwork } from '../network';

/**
 * One position-authorization grant, event-sourced from `account:delegate`.
 *
 * A delegate may act on the owner's position, so this is security-relevant
 * state, not display metadata. One document per `(accountId, delegate)` for the
 * same reason as {@link StellarContractRoleDoc}: anyone can be delegated, so the
 * set is externally sized and an array field would race under concurrent ticks.
 *
 * Revocation flips `granted` to `false` rather than deleting, so a revoke that
 * arrives before its grant cannot be undone by a later replay.
 */
export class StellarAccountDelegateDoc {
  dataType = StellarLendingDataType.ACCOUNT_DELEGATE;
  network!: StellarNetwork;

  /** On-chain numeric account id the delegation applies to. */
  accountId!: number;
  /** Wallet that owns the account. */
  owner!: string;
  /** Wallet authorized to act on the account. */
  delegate!: string;
  granted = false;

  updatedAt = 0;
  ledger = 0;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarAccountDelegateDoc>) {
    Object.assign(this, props);
    this.pk = stellarLendingPartitionKey(this.network, this.dataType);
    this.id = `accountDelegate:${this.accountId}:${this.delegate}`;
  }
}
