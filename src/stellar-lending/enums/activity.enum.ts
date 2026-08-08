export enum StellarLendingActivity {
  Supply = 'supply',
  Borrow = 'borrow',
  Withdraw = 'withdraw',
  Repay = 'repay',
  LiqRepay = 'liqRepay',
  LiqSeize = 'liqSeize',
  Multiply = 'multiply',
  /** On-chain `PositionAction::ParamUpd` (7) — risk-param refresh without flow. */
  ParamUpdate = 'paramUpdate',
  SwapDebt = 'swapDebt',
  SwapCollateral = 'swapCollateral',
  RepayWithCollateral = 'repayWithCollateral',
  CloseWithdraw = 'closeWithdraw',
  Migrate = 'migrate',
  FlashLoan = 'flashLoan',
  BadDebt = 'badDebt',
  StrategyFee = 'strategyFee',
  InitialPayment = 'initialPayment',
  Unknown = 'unknown',
}

/**
 * Protocol-level changes that alter contract config, access control or
 * authorization rather than a user's position.
 *
 * Separate from {@link StellarLendingActivity} and Stellar-only by construction:
 * MVX Kusto ingestion policies match on the position activity values, so these
 * rows are never picked up by them. Same reasoning as
 * `STELLAR_LENDING_MARKET_STATE_ACTIVITY` in the indexer.
 */
export enum StellarProtocolActivity {
  AccumulatorSet = 'stellarAccumulatorSet',
  SwapAggregatorSet = 'stellarSwapAggregatorSet',
  PriceAggregatorSet = 'stellarPriceAggregatorSet',
  PositionLimitsSet = 'stellarPositionLimitsSet',
  MinBorrowCollateralSet = 'stellarMinBorrowCollateralSet',
  BlendPoolApprovalSet = 'stellarBlendPoolApprovalSet',
  Paused = 'stellarPaused',
  Unpaused = 'stellarUnpaused',
  OwnershipTransferStarted = 'stellarOwnershipTransferStarted',
  OwnershipTransferred = 'stellarOwnershipTransferred',
  AdminTransferStarted = 'stellarAdminTransferStarted',
  AdminTransferred = 'stellarAdminTransferred',
  RoleGranted = 'stellarRoleGranted',
  RoleRevoked = 'stellarRoleRevoked',
  DelegateGranted = 'stellarDelegateGranted',
  DelegateRevoked = 'stellarDelegateRevoked',
  MinDelayChanged = 'stellarMinDelayChanged',
  ContractDeployed = 'stellarContractDeployed',
}
