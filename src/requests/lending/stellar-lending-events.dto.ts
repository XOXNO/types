import { ApiProperty } from '@nestjs/swagger';
import { AccountPositionType, PositionMode } from '../../enums/lending.enum';
import { MarketParamsRawDto } from './stellar-lending-admin-args.dto';
import { StellarLendingOracleUpdateStruct } from '../../cosmos-db/documents/lending/lending-oracle';

/**
 * Decoded Stellar lending event payload types.
 */

export class StellarMarketStateSnapshot {
  @ApiProperty({ type: 'integer', description: 'Hub the market belongs to' })
  hubId!: number;

  @ApiProperty({
    type: String,
    description: 'Pool asset whose state was updated',
  })
  asset!: string;

  @ApiProperty({
    type: 'integer',
    description: 'Millisecond timestamp of the accrual checkpoint',
  })
  timestamp!: number;

  @ApiProperty({
    description: 'Supply index after accrual, RAY decimal string',
  })
  supplyIndexRay!: string;

  @ApiProperty({
    description: 'Borrow index after accrual, RAY decimal string',
  })
  borrowIndexRay!: string;

  @ApiProperty({
    description: 'Live pool token balance, asset-native units decimal string',
  })
  cash!: string;

  @ApiProperty({
    description: 'Total scaled supply shares, RAY decimal string',
  })
  suppliedRay!: string;

  @ApiProperty({
    description: 'Total scaled borrow shares, RAY decimal string',
  })
  borrowedRay!: string;

  @ApiProperty({
    description: 'Scaled protocol revenue shares, RAY decimal string',
  })
  revenueRay!: string;
}

export class StellarEventAccountAttributes {
  @ApiProperty({ type: String, description: 'Account owner at emission time' })
  owner!: string;

  @ApiProperty({
    type: 'integer',
    description: 'Risk spoke the account binds to',
  })
  spokeId!: number;

  @ApiProperty({
    enum: PositionMode,
    enumName: 'PositionMode',
    description: 'Strategy mode (Normal collapses to None in events)',
  })
  mode!: 'None' | 'Multiply' | 'Long' | 'Short';
}

export class StellarEventPositionDelta {
  @ApiProperty({
    type: String,
    description:
      'Action symbol that produced this delta (e.g. supply, borrow, liq_repay)',
  })
  action!: string;

  @ApiProperty({
    enum: AccountPositionType,
    enumName: 'AccountPositionType',
    description: 'Deposit (collateral) or Borrow (debt) side',
  })
  positionType!: 'Deposit' | 'Borrow';

  @ApiProperty({ type: 'integer', description: 'Hub the position belongs to' })
  hubId!: number;

  @ApiProperty({ type: String, description: 'Asset address for this position' })
  asset!: string;

  @ApiProperty({
    description: 'Post-mutation scaled supply/debt shares, RAY decimal string',
  })
  scaledAmountRay!: string;

  @ApiProperty({
    description:
      'Supply index (deposits) or borrow index (debts), RAY decimal string',
  })
  indexRay!: string;

  @ApiProperty({
    description: 'Asset-native amount applied by the pool, decimal string',
  })
  amount!: string;

  @ApiProperty({
    type: 'integer',
    required: false,
    description:
      'Liquidation threshold, bps — present for Deposit, undefined for Borrow',
  })
  liquidationThresholdBps?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description:
      'Liquidation bonus, bps — present for Deposit, undefined for Borrow',
  })
  liquidationBonusBps?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description:
      'Loan-to-value, bps — present for Deposit, undefined for Borrow',
  })
  loanToValueBps?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description:
      'Protocol liquidation fee, bps — present for Deposit, undefined for Borrow',
  })
  liquidationFeesBps?: number;
}

// ---------- topic: market:create ----------
export class StellarCreateMarketEvent {
  @ApiProperty({ type: 'integer', description: 'Hub the market belongs to' })
  hubId!: number;

  @ApiProperty({ type: String, description: 'Base (pool) asset address' })
  baseAsset!: string;

  @ApiProperty({ description: 'Max borrow rate, RAY decimal string' })
  maxBorrowRate!: string;

  @ApiProperty({ description: 'Base borrow rate, RAY decimal string' })
  baseBorrowRate!: string;

  @ApiProperty({ description: 'Slope 1, RAY decimal string' })
  slope1!: string;

  @ApiProperty({ description: 'Slope 2, RAY decimal string' })
  slope2!: string;

  @ApiProperty({ description: 'Slope 3, RAY decimal string' })
  slope3!: string;

  @ApiProperty({ description: 'Mid utilization, RAY decimal string' })
  midUtilization!: string;

  @ApiProperty({ description: 'Optimal utilization, RAY decimal string' })
  optimalUtilization!: string;

  @ApiProperty({ description: 'Max utilization, RAY decimal string' })
  maxUtilization!: string;

  @ApiProperty({ type: 'integer', description: 'Reserve factor, bps' })
  reserveFactor!: number;

  @ApiProperty({
    type: String,
    description: 'Deployed pool (market) contract address',
  })
  marketAddress!: string;
}

// ---------- topic: market:params_update ----------
export class StellarUpdateMarketParamsEvent {
  @ApiProperty({ type: String, description: 'Pool asset address' })
  asset!: string;

  @ApiProperty({ description: 'Max borrow rate, RAY decimal string' })
  maxBorrowRateRay!: string;

  @ApiProperty({ description: 'Base borrow rate, RAY decimal string' })
  baseBorrowRateRay!: string;

  @ApiProperty({ description: 'Slope 1, RAY decimal string' })
  slope1Ray!: string;

  @ApiProperty({ description: 'Slope 2, RAY decimal string' })
  slope2Ray!: string;

  @ApiProperty({ description: 'Slope 3, RAY decimal string' })
  slope3Ray!: string;

  @ApiProperty({ description: 'Mid utilization, RAY decimal string' })
  midUtilizationRay!: string;

  @ApiProperty({ description: 'Optimal utilization, RAY decimal string' })
  optimalUtilizationRay!: string;

  @ApiProperty({ type: String, required: false, description: 'Max utilization, RAY decimal string' })
  maxUtilizationRay?: string;

  @ApiProperty({ type: 'integer', description: 'Reserve factor, bps' })
  reserveFactorBps!: number;
}

export class StellarPoolMarketParamsUpdate {
  @ApiProperty({ type: 'integer', description: 'Hub the market belongs to' })
  hubId!: number;

  @ApiProperty({ type: String, description: 'Pool asset address' })
  asset!: string;

  @ApiProperty({
    type: MarketParamsRawDto,
    description: 'Full pool market params',
  })
  params!: MarketParamsRawDto;
}

// ---------- topic: market:batch_params_update ----------
export class StellarUpdateMarketParamsBatchEvent {
  @ApiProperty({
    type: StellarPoolMarketParamsUpdate,
    isArray: true,
    description: 'Per-asset params updates from the central pool',
  })
  updates!: StellarPoolMarketParamsUpdate[];
}

// ---------- topic: market:batch_state_update ----------
export class StellarUpdateMarketStateBatchEvent {
  @ApiProperty({
    type: StellarMarketStateSnapshot,
    isArray: true,
    description: 'Per-asset accrual snapshots from the batch',
  })
  updates!: StellarMarketStateSnapshot[];
}

// ---------- topic: position:batch_update ----------
export class StellarUpdatePositionBatchEvent {
  @ApiProperty({
    type: String,
    description: 'Account id / nonce whose positions changed',
  })
  accountId!: string;

  @ApiProperty({
    type: StellarEventAccountAttributes,
    description: 'Account attributes at emission time',
  })
  accountAttributes!: StellarEventAccountAttributes;

  @ApiProperty({
    type: StellarEventPositionDelta,
    isArray: true,
    description: 'Net position deltas in the transaction',
  })
  updates!: StellarEventPositionDelta[];
}

// ---------- topic: position:flash_loan ----------
export class StellarFlashLoanEvent {
  @ApiProperty({ type: 'integer', description: 'Hub the market belongs to' })
  hubId!: number;

  @ApiProperty({ type: String, description: 'Flash-loaned asset address' })
  asset!: string;

  @ApiProperty({ type: String, description: 'Receiver contract address' })
  receiver!: string;

  @ApiProperty({ type: String, description: 'Caller address' })
  caller!: string;

  @ApiProperty({
    description: 'Amount loaned, asset-native units decimal string',
  })
  amount!: string;

  @ApiProperty({
    description: 'Flash-loan fee, asset-native units decimal string',
  })
  fee!: string;
}

// ---------- topic: config:oracle ----------
export class StellarUpdateAssetOracleEvent {
  @ApiProperty({ type: String, description: 'Asset address' })
  asset!: string;

  @ApiProperty({
    type: StellarLendingOracleUpdateStruct,
    description:
      'Resolved oracle provider configuration. Sanity bounds and per-source quote tokens live on this nested struct, matching the contract event wire layout.',
  })
  oracle!: StellarLendingOracleUpdateStruct;
}

// ---------- topic: debt:bad_debt ----------
export class StellarCleanBadDebtEvent {
  @ApiProperty({
    type: String,
    description: 'Account id / nonce that was cleaned',
  })
  accountId!: string;

  @ApiProperty({
    description: 'Debt written off by cleanup, USD WAD decimal string',
  })
  totalBorrowUsdWad!: string;

  @ApiProperty({
    description: 'Collateral seized by cleanup, USD WAD decimal string',
  })
  totalCollateralUsdWad!: string;
}

// ---------- topic: strategy:fee ----------
export class StellarStrategyFeeEvent {
  @ApiProperty({ type: 'integer', description: 'Hub the market belongs to' })
  hubId!: number;

  @ApiProperty({ type: String, description: 'Strategy-borrow asset address' })
  asset!: string;

  @ApiProperty({
    description: 'Gross strategy borrow amount, asset-native units decimal string',
  })
  amount!: string;

  @ApiProperty({
    description: 'Strategy fee retained as protocol revenue, asset-native units decimal string',
  })
  fee!: string;

  @ApiProperty({
    description:
      'Net amount transferred to receiver (amount - fee), asset-native units decimal string',
  })
  amountSent!: string;
}

// ---------- topic: strategy:initial_payment ----------
export class StellarInitialMultiplyPaymentEvent {
  @ApiProperty({ type: String, description: 'Initial payment token address' })
  token!: string;

  @ApiProperty({
    description: 'Initial payment amount, asset-native units decimal string',
  })
  amount!: string;

  @ApiProperty({
    description: 'USD WAD value of the initial payment, decimal string',
  })
  usdValueWad!: string;

  @ApiProperty({
    type: String,
    description: 'Account id / nonce that received the leverage entry',
  })
  accountId!: string;
}

// ---------- topic: config:approve_token ----------
export class StellarApproveTokenEvent {
  @ApiProperty({
    type: String,
    description: 'Approved WASM hash, 32-byte hex string',
  })
  wasmHash!: string;

  @ApiProperty({
    description: 'Whether the hash was approved (true) or revoked (false)',
  })
  approved!: boolean;
}

// ---------- topic: config:aggregator ----------
export class StellarUpdateAggregatorEvent {
  @ApiProperty({ type: String, description: 'Aggregator contract address' })
  aggregator!: string;
}

// ---------- topic: config:accumulator ----------
export class StellarUpdateAccumulatorEvent {
  @ApiProperty({ type: String, description: 'Accumulator contract address' })
  accumulator!: string;
}

// ---------- topic: config:pool_template ----------
export class StellarUpdatePoolTemplateEvent {
  @ApiProperty({
    type: String,
    description: 'Pool template WASM hash, 32-byte hex string',
  })
  wasmHash!: string;
}

// ---------- topic: config:position_limits ----------
export class StellarUpdatePositionLimitsEvent {
  @ApiProperty({
    type: 'integer',
    description: 'Max supply positions per account',
  })
  maxSupplyPositions!: number;

  @ApiProperty({
    type: 'integer',
    description: 'Max borrow positions per account',
  })
  maxBorrowPositions!: number;
}

// ---------- topic: config:oracle_disabled ----------
export class StellarOracleDisabledEvent {
  @ApiProperty({ type: String, description: 'Asset whose oracle was disabled' })
  asset!: string;
}

// ---------- topic: position:liquidation ----------
export class StellarLiquidationEvent {
  @ApiProperty({ type: String, description: 'Liquidator address' })
  liquidator!: string;

  @ApiProperty({
    type: String,
    description: 'Account id / nonce that was liquidated',
  })
  accountId!: string;

  @ApiProperty({
    description: 'Aggregate debt repaid, USD WAD decimal string',
  })
  repaidUsdWad!: string;

  @ApiProperty({
    description:
      'Applied liquidation bonus, bps decimal string; total seized USD is repaid * (1 + bonus)',
  })
  bonusBps!: string;
}

// ---------- topic: config:spoke ----------
export class StellarUpdateSpokeEvent {
  @ApiProperty({ type: 'integer', description: 'Spoke id' })
  spokeId!: number;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the spoke is deprecated (all reads gated)',
  })
  isDeprecated!: boolean;

  @ApiProperty({
    type: String,
    description:
      'Liquidation curve target health factor (USD WAD). Defaulted at spoke creation, overridable via SetSpokeLiquidationCurve.',
  })
  liquidationTargetHfWad!: string;

  @ApiProperty({
    type: String,
    description:
      'Health factor at which the liquidation bonus reaches its maximum (USD WAD)',
  })
  healthFactorForMaxBonusWad!: string;

  @ApiProperty({
    type: 'integer',
    description: 'Liquidation bonus scaling factor (BPS, 10000 = 1.0x)',
  })
  liquidationBonusFactorBps!: number;
}

/**
 * Discriminated union of every decoded Stellar lending event, keyed by the
 * `"<domain>:<action>"` topic. Narrow on `topic` to access the typed `data`.
 */
export type StellarLendingDecodedEvent =
  | { topic: 'market:create'; data: StellarCreateMarketEvent }
  | { topic: 'market:params_update'; data: StellarUpdateMarketParamsEvent }
  | {
      topic: 'market:batch_state_update';
      data: StellarUpdateMarketStateBatchEvent;
    }
  | {
      topic: 'market:batch_params_update';
      data: StellarUpdateMarketParamsBatchEvent;
    }
  | { topic: 'position:batch_update'; data: StellarUpdatePositionBatchEvent }
  | { topic: 'position:flash_loan'; data: StellarFlashLoanEvent }
  | { topic: 'config:oracle'; data: StellarUpdateAssetOracleEvent }
  | { topic: 'position:liquidation'; data: StellarLiquidationEvent }
  | { topic: 'debt:bad_debt'; data: StellarCleanBadDebtEvent }
  | {
      topic: 'strategy:initial_payment';
      data: StellarInitialMultiplyPaymentEvent;
    }
  | { topic: 'strategy:fee'; data: StellarStrategyFeeEvent }
  | { topic: 'config:approve_token'; data: StellarApproveTokenEvent }
  | { topic: 'config:aggregator'; data: StellarUpdateAggregatorEvent }
  | { topic: 'config:accumulator'; data: StellarUpdateAccumulatorEvent }
  | { topic: 'config:pool_template'; data: StellarUpdatePoolTemplateEvent }
  | { topic: 'config:position_limits'; data: StellarUpdatePositionLimitsEvent }
  | { topic: 'config:oracle_disabled'; data: StellarOracleDisabledEvent }
  | { topic: 'config:spoke'; data: StellarUpdateSpokeEvent };
