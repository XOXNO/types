/**
 * Stellar lending governance (timelock) proposal taxonomy.
 *
 * `GovernanceProposalKind` mirrors the `AdminOperation` variants the governance
 * contract schedules; the indexer maps a scheduled operation's invoked function
 * symbol to one of these so the dashboard can title and group proposals.
 */
export enum GovernanceProposalKind {
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
  UpdatePoolCaps = 'UpdatePoolCaps',
  DeployPool = 'DeployPool',
  UpgradePool = 'UpgradePool',
  DisableTokenOracle = 'DisableTokenOracle',
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
 * `execute`) or the governance contract itself (`execute_self`).
 */
export enum GovernanceProposalTarget {
  Controller = 'Controller',
  Governance = 'Governance',
}
