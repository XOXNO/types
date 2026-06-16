/**
 * Soroban event dispatch keys for the XOXNO Stellar lending controller,
 * each value joined as `"<domain>:<action>"`.
 */
export enum StellarLendingTopic {
  MarketCreate = 'market:create',
  MarketParamsUpdate = 'market:params_update',
  MarketStateBatchUpdate = 'market:batch_state_update',
  PositionBatchUpdate = 'position:batch_update',
  PositionFlashLoan = 'position:flash_loan',
  ConfigAsset = 'config:asset',
  ConfigOracle = 'config:oracle',
  ConfigEModeCategory = 'config:emode_category',
  ConfigEModeAsset = 'config:emode_asset',
  ConfigRemoveEModeAsset = 'config:remove_emode_asset',
  DebtBadDebt = 'debt:bad_debt',
  StrategyInitialPayment = 'strategy:initial_payment',
  ConfigApproveToken = 'config:approve_token',
  ConfigAggregator = 'config:aggregator',
  ConfigAccumulator = 'config:accumulator',
  ConfigPoolTemplate = 'config:pool_template',
  ConfigPositionLimits = 'config:position_limits',
  ConfigOracleDisabled = 'config:oracle_disabled',
  OracleTwapDegraded = 'oracle:twap_degraded',
}
