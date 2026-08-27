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
  /**
   * On-chain `PositionAction::LiqCredit` (15) — the collateral credited to a
   * share-credit liquidator's receiving account. Emitted only under
   * `SeizeMode::Credit`, on the second (receiver) position batch.
   *
   * Gross vs net, and the reason this is a separate tag from `LiqSeize`:
   * `liqSeize` is the liquidated account's debit, **gross** of the protocol fee
   * (in both seize modes); `liqCredit` is the receiver's credit, **net** of it.
   * The fee is `liqSeize.amount - liqCredit.amount`. Summing both tags as one
   * quantity double-counts the seizure, and reading the gross `liqSeize` figure
   * as liquidator proceeds overstates them by the fee.
   */
  LiqCredit = 'liqCredit',
  /**
   * Position-NFT `transfer` — the whole account (collateral AND debt) changed
   * hands outside the controller. `owner` is the receiving wallet; the row's
   * address is the sender. Not an on-chain `PositionAction`: emitted by the
   * position-NFT contract, not the controller.
   */
  NftTransfer = 'nftTransfer',
  FlashLoan = 'flashLoan',
  /**
   * On-chain `PositionAction::FlashPos` (16) — the strategy-debt mint leg of
   * `flash_position`. A real borrow against the account, so the leg carries
   * `side: 'borrow'` and a resulting balance like any other debt movement;
   * distinct from {@link FlashLoan}, which is uncollateralized and closes
   * within the transaction.
   */
  FlashPosition = 'flashPosition',
  BadDebt = 'badDebt',
  StrategyFee = 'strategyFee',
  InitialPayment = 'initialPayment',
  /**
   * Controller `revenue:claim` — accrued protocol revenue swept from the pool
   * and forwarded to the accumulator.
   *
   * This is the ONLY record of realized protocol revenue. The `revenue` field
   * on the market-state feed is OUTSTANDING unclaimed revenue and is
   * decremented by every claim, so it is not a cumulative counter and must not
   * be read as one. Lifetime revenue for a market is
   * `outstanding (valued at the supply index) + Σ revenueClaim.amount`.
   *
   * `amount` is the measured amount actually forwarded, not the pool's
   * reported figure. Claims can be partial (the burn is capped at the market's
   * available cash), so one market emits many of these over time.
   */
  RevenueClaim = 'revenueClaim',
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
