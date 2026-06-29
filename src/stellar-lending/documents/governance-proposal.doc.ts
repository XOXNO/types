import {
  StellarGovernanceProposalKind,
  StellarGovernanceProposalStatus,
  StellarGovernanceProposalTarget,
  StellarLendingDataType,
} from '../enums';

/**
 * One decoded "what will change" row for a governance proposal, rendered as a
 * label/value pair by the indexer.
 */
export interface StellarGovernanceProposalField {
  label: string;
  value: string;
}

/**
 * A timelock proposal on the Stellar lending governance contract. Persistence
 * shape (no swagger decorators); api-v2 owns the response DTO.
 *
 * `status` is the coarse event-derived state (Pending/Executed/Cancelled);
 * Waiting/Ready/Expired are derived client-side from the ledger fields.
 */
export class StellarGovernanceProposalDoc {
  dataType = StellarLendingDataType.GOVERNANCE_PROPOSAL;
  operationId!: string;
  kind!: StellarGovernanceProposalKind;
  status!: StellarGovernanceProposalStatus;
  target!: StellarGovernanceProposalTarget;
  targetAddress!: string;
  functionName!: string;
  argsXdr: string[] = [];
  salt!: string;
  predecessor!: string;
  proposer!: string;
  assetAddress?: string;
  assetSymbol?: string;
  summary!: string;
  fields: StellarGovernanceProposalField[] = [];
  scheduledLedger!: number;
  readyLedger!: number;
  delayLedgers!: number;
  expiresLedger!: number;
  executedLedger?: number;
  cancelledLedger?: number;
  scheduledAt!: number;
  executedAt?: number;
  cancelledAt?: number;
  scheduledTxHash!: string;
  executedTxHash?: string;
  cancelledTxHash?: string;
  id!: string;
  pk!: string;
  _ts?: number;

  constructor(props?: Partial<StellarGovernanceProposalDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = this.operationId;
  }
}
