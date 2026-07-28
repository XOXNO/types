/**
 * Stellar lending governance (timelock) proposal taxonomy.
 *
 * Mirrors live `AdminOperation` variants. Shared with MVX-era names kept only
 * as deprecated aliases where the old string matched a renamed variant.
 */
export enum GovernanceProposalKind {
  SetSwapAggregator = 'SetSwapAggregator',
  SetPriceAggregator = 'SetPriceAggregator',
  SetAccumulator = 'SetAccumulator',
  SetPositionLimits = 'SetPositionLimits',
  SetMinBorrowCollateralUsd = 'SetMinBorrowCollateralUsd',
  SetPositionManager = 'SetPositionManager',
  CreateHub = 'CreateHub',
  AddSpoke = 'AddSpoke',
  RemoveSpoke = 'RemoveSpoke',
  AddAssetToSpoke = 'AddAssetToSpoke',
  EditAssetInSpoke = 'EditAssetInSpoke',
  RemoveAssetFromSpoke = 'RemoveAssetFromSpoke',
  SetSpokeLiquidationCurve = 'SetSpokeLiquidationCurve',
  ApproveBlendPool = 'ApproveBlendPool',
  RevokeBlendPool = 'RevokeBlendPool',
  CreateLiquidityPool = 'CreateLiquidityPool',
  UpgradeLiquidityPoolParams = 'UpgradeLiquidityPoolParams',
  DeployPool = 'DeployPool',
  UpgradePool = 'UpgradePool',
  UpgradeController = 'UpgradeController',
  MigrateController = 'MigrateController',
  TransferCtrlOwnership = 'TransferCtrlOwnership',
  EditOracleTolerance = 'EditOracleTolerance',
  ForceSocializeBadDebt = 'ForceSocializeBadDebt',
  Unpause = 'Unpause',
  UpgradeGov = 'UpgradeGov',
  UpdateGovDelay = 'UpdateGovDelay',
  GrantGovRole = 'GrantGovRole',
  RevokeGovRole = 'RevokeGovRole',
  TransferGovOwnership = 'TransferGovOwnership',
  ConfigureAssetOracle = 'ConfigureAssetOracle',
  CancellerReset = 'CancellerReset',
  /** @deprecated Use `SetSwapAggregator`. */
  SetAggregator = 'SetSwapAggregator',
  /** @deprecated Use `ConfigureAssetOracle`. */
  ConfigureMarketOracle = 'ConfigureAssetOracle',
  /** @deprecated Use `ApproveBlendPool`. */
  ApproveToken = 'ApproveBlendPool',
  /** @deprecated Removed from live AdminOperation. */
  SetPoolTemplate = 'SetPoolTemplate',
  /** @deprecated Removed from live AdminOperation. */
  RevokeToken = 'RevokeToken',
  Unknown = 'Unknown',
}

export enum GovernanceProposalStatus {
  Pending = 'Pending',
  Executed = 'Executed',
  Cancelled = 'Cancelled',
}

export enum GovernanceProposalTarget {
  Controller = 'Controller',
  Governance = 'Governance',
  PriceAggregator = 'PriceAggregator',
}
