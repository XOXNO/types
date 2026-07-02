import { ApiProperty } from '@nestjs/swagger';

import { LendingDataType } from '../../../enums/lending-data-type.enum';
import {
  GovernanceProposalKind,
  GovernanceProposalStatus,
  GovernanceProposalTarget,
} from '../../../enums/lending-governance.enum';
import { createCosmosPaginatedResponse } from '../../cosmos-db-paginated-response.dto';

/**
 * One decoded "what will change" row for a governance proposal, rendered as a
 * label/value pair. The indexer formats these from the decoded operation args
 * so the dashboard can show the proposed change without re-decoding ScVals.
 */
export class GovernanceProposalField {
  @ApiProperty({ description: 'Field label', example: 'Loan-to-value' })
  label!: string;

  @ApiProperty({ description: 'Human-readable field value', example: '80.00%' })
  value!: string;
}

/**
 * A timelock proposal on the Stellar lending governance contract.
 *
 * The contract stores only a single `readyLedger` per operation; the full
 * operation (target/function/args/salt) lives in the `OperationScheduled`
 * event. The indexer reconstructs it here so the dashboard can list proposals,
 * show a ledger-based countdown, and rebuild the exact `execute` call from
 * `argsXdr`.
 *
 * `status` is the coarse event-derived state (Pending/Executed/Cancelled).
 * Waiting/Ready/Expired are DERIVED client-side from `readyLedger`,
 * `expiresLedger`, and the current ledger — the contract has no on-chain
 * "ready" or "expired" state.
 */
export class LendingGovernanceProposalDoc {
  @ApiProperty({
    enum: LendingDataType,
    enumName: 'LendingDataType',
    example: LendingDataType.GOVERNANCE_PROPOSAL,
  })
  dataType = LendingDataType.GOVERNANCE_PROPOSAL;

  @ApiProperty({
    description: 'Operation id (keccak256 content hash), hex string',
    example: 'ab12cd34ef56...',
  })
  operationId!: string;

  @ApiProperty({
    enum: GovernanceProposalKind,
    enumName: 'GovernanceProposalKind',
    description: 'Which change this proposal performs',
    example: GovernanceProposalKind.CreateLiquidityPool,
  })
  kind!: GovernanceProposalKind;

  @ApiProperty({
    enum: GovernanceProposalStatus,
    enumName: 'GovernanceProposalStatus',
    description:
      'Event-derived status. Waiting/Ready/Expired are derived client-side from ledger fields.',
    example: GovernanceProposalStatus.Pending,
  })
  status!: GovernanceProposalStatus;

  @ApiProperty({
    enum: GovernanceProposalTarget,
    enumName: 'GovernanceProposalTarget',
    description: 'Whether execution calls the controller or governance itself',
    example: GovernanceProposalTarget.Controller,
  })
  target!: GovernanceProposalTarget;

  @ApiProperty({
    description:
      'Contract address invoked on execute (controller or governance)',
  })
  targetAddress!: string;

  @ApiProperty({
    description: 'Soroban function symbol invoked on execute',
    example: 'edit_asset_config',
  })
  functionName!: string;

  @ApiProperty({
    description:
      'Base64 ScVal XDR per execute argument, in function-parameter order. Passed back verbatim to rebuild the execute call.',
    isArray: true,
    items: { type: 'string' },
  })
  argsXdr!: string[];

  @ApiProperty({ description: 'Operation salt, hex BytesN<32>' })
  salt!: string;

  @ApiProperty({
    description: 'Operation predecessor, hex BytesN<32> (zero = none)',
  })
  predecessor!: string;

  @ApiProperty({ description: 'Proposer account (G...) address' })
  proposer!: string;

  @ApiProperty({
    required: false,
    description: 'Asset address this proposal concerns, when applicable',
  })
  assetAddress?: string;

  @ApiProperty({
    required: false,
    description: 'Resolved token symbol for assetAddress, when known',
    example: 'USDC',
  })
  assetSymbol?: string;

  @ApiProperty({
    required: false,
    type: 'integer',
    description: 'Hub the proposal concerns, when hub-scoped',
  })
  hubId?: number;

  @ApiProperty({
    required: false,
    type: 'integer',
    description: 'Spoke the proposal concerns, when spoke-scoped',
  })
  spokeId?: number;

  @ApiProperty({
    description: 'One-line human summary of the proposed change',
    example: 'Edit asset config for USDC',
  })
  summary!: string;

  @ApiProperty({
    description: 'Decoded change as label/value rows',
    isArray: true,
    type: GovernanceProposalField,
  })
  fields: GovernanceProposalField[] = [];

  @ApiProperty({
    type: 'integer',
    description: 'Ledger at which the proposal was scheduled',
  })
  scheduledLedger!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Ledger at/after which execution is allowed (OperationLedger)',
  })
  readyLedger!: number;

  @ApiProperty({ type: 'integer', description: 'Timelock delay in ledgers' })
  delayLedgers!: number;

  @ApiProperty({
    type: 'integer',
    description:
      'Ledger after which the proposal expires and can no longer be executed (readyLedger + grace)',
  })
  expiresLedger!: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Ledger at which the proposal was executed',
  })
  executedLedger?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Ledger at which the proposal was cancelled',
  })
  cancelledLedger?: number;

  @ApiProperty({
    type: 'integer',
    description: 'Unix seconds when the proposal was scheduled',
  })
  scheduledAt!: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Unix seconds when executed',
  })
  executedAt?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Unix seconds when cancelled',
  })
  cancelledAt?: number;

  @ApiProperty({ description: 'Transaction hash of the schedule (propose) tx' })
  scheduledTxHash!: string;

  @ApiProperty({
    required: false,
    description: 'Transaction hash of the execute tx',
  })
  executedTxHash?: string;

  @ApiProperty({
    required: false,
    description: 'Transaction hash of the cancel tx',
  })
  cancelledTxHash?: string;

  @ApiProperty({ description: 'Cosmos DB document identifier (= operationId)' })
  id!: string;

  @ApiProperty({
    description: 'Cosmos DB partition key',
    example: 'governanceProposal',
  })
  pk!: string;

  @ApiProperty({ description: 'Cosmos DB timestamp', required: false })
  _ts?: number;

  constructor(props?: Partial<LendingGovernanceProposalDoc>) {
    Object.assign(this, props);
    this.pk = this.dataType;
    this.id = this.operationId;
  }
}

export class LendingGovernanceProposalQuery extends createCosmosPaginatedResponse(
  LendingGovernanceProposalDoc,
) {}
