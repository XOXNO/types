/**
 * Stellar lending governance (timelock) proposal taxonomy. Self-contained copy
 * for the independent Stellar-lending subtree (no MVX coupling).
 *
 * Mirrors live `AdminOperation` variants the governance contract schedules.
 */
export enum StellarGovernanceProposalKind {
  SetSwapAggregator = 'SetSwapAggregator',
  SetPriceAggregator = 'SetPriceAggregator',
  SetAccumulator = 'SetAccumulator',
  SetPositionLimits = 'SetPositionLimits',
  SetMinBorrowCollateralUsd = 'SetMinBorrowCollateralUsd',
  CreateHub = 'CreateHub',
  AddSpoke = 'AddSpoke',
  RemoveSpoke = 'RemoveSpoke',
  AddAssetToSpoke = 'AddAssetToSpoke',
  EditAssetInSpoke = 'EditAssetInSpoke',
  RemoveAssetFromSpoke = 'RemoveAssetFromSpoke',
  ApproveBlendPool = 'ApproveBlendPool',
  RevokeBlendPool = 'RevokeBlendPool',
  CreateLiquidityPool = 'CreateLiquidityPool',
  UpgradeLiquidityPoolParams = 'UpgradeLiquidityPoolParams',
  DeployPool = 'DeployPool',
  UpgradePool = 'UpgradePool',
  DeployPositionNft = 'DeployPositionNft',
  UpgradePositionNft = 'UpgradePositionNft',
  SetPositionManager = 'SetPositionManager',
  UpgradeController = 'UpgradeController',
  MigrateController = 'MigrateController',
  TransferCtrlOwnership = 'TransferCtrlOwnership',
  EditOracleTolerance = 'EditOracleTolerance',
  SetSpokeLiquidationCurve = 'SetSpokeLiquidationCurve',
  ForceSocializeBadDebt = 'ForceSocializeBadDebt',
  Unpause = 'Unpause',
  UpgradeGov = 'UpgradeGov',
  UpdateGovDelay = 'UpdateGovDelay',
  GrantGovRole = 'GrantGovRole',
  RevokeGovRole = 'RevokeGovRole',
  TransferGovOwnership = 'TransferGovOwnership',
  ConfigureAssetOracle = 'ConfigureAssetOracle',
  /**
   * Owner-only, non-vetoable Recovery-tier council reset (`reset_cancellers`).
   */
  CancellerReset = 'CancellerReset',
  /** @deprecated Alias — use `SetSwapAggregator`. */
  SetAggregator = 'SetSwapAggregator',
  /** @deprecated Alias — use `ConfigureAssetOracle`. */
  ConfigureMarketOracle = 'ConfigureAssetOracle',
  /** @deprecated Alias — use `ApproveBlendPool`. */
  ApproveToken = 'ApproveBlendPool',
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
  PriceAggregator = 'PriceAggregator',
}
