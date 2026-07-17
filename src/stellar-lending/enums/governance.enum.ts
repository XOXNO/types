/**
 * Stellar lending governance (timelock) proposal taxonomy. Self-contained copy
 * for the independent Stellar-lending subtree (no MVX coupling).
 *
 * `StellarGovernanceProposalKind` mirrors the `AdminOperation` variants the
 * governance contract schedules; the indexer maps a scheduled operation's
 * invoked function symbol to one of these.
 */
export enum StellarGovernanceProposalKind {
  SetAggregator = 'SetAggregator',
  SetAccumulator = 'SetAccumulator',
  SetPoolTemplate = 'SetPoolTemplate',
  EditAssetConfig = 'EditAssetConfig',
  SetPositionLimits = 'SetPositionLimits',
  SetMinBorrowCollateral = 'SetMinBorrowCollateral',
  AddEModeCategory = 'AddEModeCategory',
  RemoveEModeCategory = 'RemoveEModeCategory',
  AddAssetToEModeCategory = 'AddAssetToEModeCategory',
  EditAssetInEModeCategory = 'EditAssetInEModeCategory',
  RemoveAssetFromEMode = 'RemoveAssetFromEMode',
  ApproveToken = 'ApproveToken',
  RevokeToken = 'RevokeToken',
  ApproveBlendPool = 'ApproveBlendPool',
  RevokeBlendPool = 'RevokeBlendPool',
  CreateLiquidityPool = 'CreateLiquidityPool',
  UpgradeLiquidityPoolParams = 'UpgradeLiquidityPoolParams',
  DeployPool = 'DeployPool',
  UpgradePool = 'UpgradePool',
  UpgradeController = 'UpgradeController',
  MigrateController = 'MigrateController',
  TransferControllerOwnership = 'TransferControllerOwnership',
  ConfigureMarketOracle = 'ConfigureMarketOracle',
  EditOracleTolerance = 'EditOracleTolerance',
  SetSpokeLiquidationCurve = 'SetSpokeLiquidationCurve',
  GovernanceUpgrade = 'GovernanceUpgrade',
  UpdateDelay = 'UpdateDelay',
  GrantGovernanceRole = 'GrantGovernanceRole',
  RevokeGovernanceRole = 'RevokeGovernanceRole',
  TransferGovernanceOwnership = 'TransferGovernanceOwnership',
  /**
   * Owner-only, non-vetoable Recovery-tier council reset (`reset_cancellers`).
   * Scheduled at the ~30-day Recovery delay to replace a captured canceller set.
   */
  CancellerReset = 'CancellerReset',
  Unknown = 'Unknown',
}

/**
 * Coarse, event-derived proposal status. `Waiting`/`Ready`/`Expired` are NOT
 * stored on-chain — clients derive them from `readyLedger`, `expiresLedger`,
 * and the current ledger.
 */
export enum StellarGovernanceProposalStatus {
  Pending = 'Pending',
  Executed = 'Executed',
  Cancelled = 'Cancelled',
}

/**
 * Whether executing the proposal invokes the lending controller (generic
 * `execute`) or the governance contract itself (`execute_self`).
 */
export enum StellarGovernanceProposalTarget {
  Controller = 'Controller',
  Governance = 'Governance',
}
