/**
 * Soroban event dispatch keys for the XOXNO Stellar lending controller.
 *
 * Each value is the `"<domain>:<action>"` join of a `#[contractevent]`'s two
 * topic symbols (see `rs-lending-xlm/common/src/events.rs`). This is the single
 * source of truth shared by the `@xoxno/sdk-js` decoder registry and every
 * consumer; it is intentionally distinct from the MVX-named
 * `LendingScEventIdentifier`, whose values do not match the Soroban topics.
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
  DebtCeilingUpdate = 'debt:ceiling_update',
  DebtCeilingBatchUpdate = 'debt:ceiling_batch_update',
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
