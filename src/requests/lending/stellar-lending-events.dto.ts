import { ApiProperty } from '@nestjs/swagger';
import { AccountPositionType, PositionMode } from '../../enums/lending.enum';
import { AssetConfigRawDto } from './stellar-lending-admin-args.dto';
import { StellarLendingOracleUpdateStruct } from '../../cosmos-db/documents/lending/lending-oracle';

/**
 * Decoded payloads for the 21 XOXNO Stellar lending controller
 * `#[contractevent]`s (see `rs-lending-xlm/common/src/events.rs`).
 *
 * These are the normalized shapes the `@xoxno/sdk-js` decoder registry
 * produces after funnelling the Soroban event `data` through
 * `scValToNative`: i128/u128/u64 ids and amounts are decimal strings,
 * u32 counts/bps are numbers, addresses/symbols are strings, int-enums are
 * mapped to their string enum, and absent Soroban `Option`s are `undefined`.
 *
 * Borrow-side position deltas carry no collateral risk parameters: the
 * contract zeroes `liquidation_threshold`/`liquidation_bonus`/`loan_to_value`
 * for debt positions, so the decoder surfaces them as `undefined` (not 0) to
 * stop consumers recording a spurious 0% threshold. There is no
 * `liquidationFeesBps` on the delta — that field does not exist on-chain.
 */

export class StellarMarketStateSnapshot {
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
  reservesRay!: string;

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

  @ApiProperty({
    required: false,
    description: 'USD WAD price used for accrual, decimal string when present',
  })
  assetPriceWad?: string;
}

export class StellarEventAccountAttributes {
  @ApiProperty({ type: String, description: 'Account owner at emission time' })
  owner!: string;

  @ApiProperty({
    description:
      'True when the account is bound to a single isolated collateral asset',
  })
  isIsolatedPosition!: boolean;

  @ApiProperty({
    type: 'integer',
    description: 'E-mode category id; 0 means no e-mode',
  })
  eModeCategoryId!: number;

  @ApiProperty({
    enum: PositionMode,
    enumName: 'PositionMode',
    description: 'Strategy mode (Normal collapses to None in events)',
  })
  mode!: 'None' | 'Multiply' | 'Long' | 'Short';

  @ApiProperty({
    type: String,
    required: false,
    description: 'Isolated collateral asset when isIsolatedPosition',
  })
  isolatedToken?: string;
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
    required: false,
    description:
      'USD WAD price used for the mutation, decimal string when present',
  })
  assetPriceWad?: string;

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
}

export class StellarEventDebtCeilingEntry {
  @ApiProperty({ type: String, description: 'Isolated asset address' })
  asset!: string;

  @ApiProperty({
    description:
      'Total isolated debt against the asset, USD WAD decimal string',
  })
  totalDebtUsdWad!: string;
}

export class StellarEventEModeCategory {
  @ApiProperty({ type: 'integer', description: 'E-mode category id' })
  categoryId!: number;

  @ApiProperty({ type: 'integer', description: 'Loan-to-value, bps' })
  loanToValueBps!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation threshold, bps' })
  liquidationThresholdBps!: number;

  @ApiProperty({ type: 'integer', description: 'Liquidation bonus, bps' })
  liquidationBonusBps!: number;

  @ApiProperty({ description: 'Whether the category is deprecated' })
  isDeprecated!: boolean;
}

export class StellarEModeAssetConfig {
  @ApiProperty({
    description: 'Whether the asset is collateralizable within the category',
  })
  isCollateralizable!: boolean;

  @ApiProperty({
    description: 'Whether the asset is borrowable within the category',
  })
  isBorrowable!: boolean;
}

// ---------- topic: market:create ----------
export class StellarCreateMarketEvent {
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

  @ApiProperty({ type: 'integer', description: 'Reserve factor, bps' })
  reserveFactor!: number;

  @ApiProperty({
    type: String,
    description: 'Deployed pool (market) contract address',
  })
  marketAddress!: string;

  @ApiProperty({
    type: AssetConfigRawDto,
    description: 'Initial asset risk configuration',
  })
  config!: AssetConfigRawDto;
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

  @ApiProperty({ type: 'integer', description: 'Reserve factor, bps' })
  reserveFactorBps!: number;
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

// ---------- topic: config:asset ----------
export class StellarUpdateAssetConfigEvent {
  @ApiProperty({ type: String, description: 'Asset address' })
  asset!: string;

  @ApiProperty({
    type: AssetConfigRawDto,
    description: 'Updated asset risk configuration',
  })
  config!: AssetConfigRawDto;
}

// ---------- topic: config:oracle ----------
export class StellarUpdateAssetOracleEvent {
  @ApiProperty({ type: String, description: 'Asset address' })
  asset!: string;

  @ApiProperty({
    type: StellarLendingOracleUpdateStruct,
    description: 'Resolved oracle provider configuration',
  })
  oracle!: StellarLendingOracleUpdateStruct;
}

// ---------- topic: config:emode_category ----------
export class StellarUpdateEModeCategoryEvent {
  @ApiProperty({
    type: StellarEventEModeCategory,
    description: 'E-mode category snapshot',
  })
  category!: StellarEventEModeCategory;
}

// ---------- topic: config:emode_asset ----------
export class StellarUpdateEModeAssetEvent {
  @ApiProperty({ type: String, description: 'Asset address' })
  asset!: string;

  @ApiProperty({
    type: StellarEModeAssetConfig,
    description: 'Per-asset e-mode flags',
  })
  config!: StellarEModeAssetConfig;

  @ApiProperty({ type: 'integer', description: 'E-mode category id' })
  categoryId!: number;
}

// ---------- topic: config:remove_emode_asset ----------
export class StellarRemoveEModeAssetEvent {
  @ApiProperty({
    type: String,
    description: 'Asset address removed from the category',
  })
  asset!: string;

  @ApiProperty({ type: 'integer', description: 'E-mode category id' })
  categoryId!: number;
}

// ---------- topic: debt:ceiling_update (legacy single; not emitted on-chain) ----------
export class StellarUpdateDebtCeilingEvent {
  @ApiProperty({ type: String, description: 'Isolated asset address' })
  asset!: string;

  @ApiProperty({
    description:
      'Total isolated debt against the asset, USD WAD decimal string',
  })
  totalDebtUsdWad!: string;
}

// ---------- topic: debt:ceiling_batch_update ----------
export class StellarUpdateDebtCeilingBatchEvent {
  @ApiProperty({
    type: StellarEventDebtCeilingEntry,
    isArray: true,
    description: 'Final isolated-debt totals for touched assets',
  })
  updates!: StellarEventDebtCeilingEntry[];
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

// ---------- topic: oracle:twap_degraded ----------
export class StellarOracleTwapDegradedEvent {
  @ApiProperty({
    type: String,
    description: 'Oracle contract address that degraded',
  })
  oracle!: string;

  @ApiProperty({
    type: 'integer',
    description: 'Provider-specific degradation reason code',
  })
  reasonCode!: number;
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
  | { topic: 'position:batch_update'; data: StellarUpdatePositionBatchEvent }
  | { topic: 'position:flash_loan'; data: StellarFlashLoanEvent }
  | { topic: 'config:asset'; data: StellarUpdateAssetConfigEvent }
  | { topic: 'config:oracle'; data: StellarUpdateAssetOracleEvent }
  | { topic: 'config:emode_category'; data: StellarUpdateEModeCategoryEvent }
  | { topic: 'config:emode_asset'; data: StellarUpdateEModeAssetEvent }
  | { topic: 'config:remove_emode_asset'; data: StellarRemoveEModeAssetEvent }
  | { topic: 'debt:ceiling_update'; data: StellarUpdateDebtCeilingEvent }
  | {
      topic: 'debt:ceiling_batch_update';
      data: StellarUpdateDebtCeilingBatchEvent;
    }
  | { topic: 'debt:bad_debt'; data: StellarCleanBadDebtEvent }
  | {
      topic: 'strategy:initial_payment';
      data: StellarInitialMultiplyPaymentEvent;
    }
  | { topic: 'config:approve_token'; data: StellarApproveTokenEvent }
  | { topic: 'config:aggregator'; data: StellarUpdateAggregatorEvent }
  | { topic: 'config:accumulator'; data: StellarUpdateAccumulatorEvent }
  | { topic: 'config:pool_template'; data: StellarUpdatePoolTemplateEvent }
  | { topic: 'config:position_limits'; data: StellarUpdatePositionLimitsEvent }
  | { topic: 'config:oracle_disabled'; data: StellarOracleDisabledEvent }
  | { topic: 'oracle:twap_degraded'; data: StellarOracleTwapDegradedEvent };
