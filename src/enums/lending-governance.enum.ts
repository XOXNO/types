/**
 * Stellar lending governance (timelock) proposal taxonomy.
 *
 * `GovernanceProposalKind` mirrors the `propose_*` entrypoints on the
 * governance contract; the indexer maps an operation's invoked function symbol
 * to one of these so the dashboard can title and group proposals.
 */
export enum GovernanceProposalKind {
  SetAggregator = 'SetAggregator',
  SetAccumulator = 'SetAccumulator',
  SetPoolTemplate = 'SetPoolTemplate',
  EditAssetConfig = 'EditAssetConfig',
  SetPositionLimits = 'SetPositionLimits',
  SetMinBorrowCollateral = 'SetMinBorrowCollateral',
  AddEModeCategory = 'AddEModeCategory',
  EditEModeCategory = 'EditEModeCategory',
  RemoveEModeCategory = 'RemoveEModeCategory',
  AddAssetToEModeCategory = 'AddAssetToEModeCategory',
  EditAssetInEModeCategory = 'EditAssetInEModeCategory',
  RemoveAssetFromEMode = 'RemoveAssetFromEMode',
  ApproveToken = 'ApproveToken',
  RevokeToken = 'RevokeToken',
  CreateLiquidityPool = 'CreateLiquidityPool',
  UpgradeLiquidityPoolParams = 'UpgradeLiquidityPoolParams',
  UpdatePoolCaps = 'UpdatePoolCaps',
  DeployPool = 'DeployPool',
  UpgradePool = 'UpgradePool',
  GrantControllerRole = 'GrantControllerRole',
  RevokeControllerRole = 'RevokeControllerRole',
  UpgradeController = 'UpgradeController',
  MigrateController = 'MigrateController',
  TransferControllerOwnership = 'TransferControllerOwnership',
  ConfigureMarketOracle = 'ConfigureMarketOracle',
  EditOracleTolerance = 'EditOracleTolerance',
  GovernanceUpgrade = 'GovernanceUpgrade',
  UpdateDelay = 'UpdateDelay',
  GrantGovernanceRole = 'GrantGovernanceRole',
  RevokeGovernanceRole = 'RevokeGovernanceRole',
  TransferGovernanceOwnership = 'TransferGovernanceOwnership',
  Unknown = 'Unknown',
}

/**
 * Coarse, event-derived proposal status. `Waiting`/`Ready`/`Expired` are NOT
 * stored on-chain — clients derive them from `readyLedger`, `expiresLedger`,
 * and the current ledger.
 */
export enum GovernanceProposalStatus {
  Pending = 'Pending',
  Executed = 'Executed',
  Cancelled = 'Cancelled',
}

/**
 * Whether executing the proposal invokes the lending controller (generic
 * `execute`) or the governance contract itself (typed `execute_*`).
 */
export enum GovernanceProposalTarget {
  Controller = 'Controller',
  Governance = 'Governance',
}
