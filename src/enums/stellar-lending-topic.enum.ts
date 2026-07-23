/**
 * Soroban event dispatch keys for the XOXNO Stellar lending controller,
 * each value joined as `"<domain>:<action>"`.
 *
 * Keep in parity with az-functions `StellarV2DispatchKey` plus known-but-
 * unindexed config topics (approve_token, aggregator, accumulator, …).
 * Governance schedulable fn names like `approve_blend_pool` are NOT topics.
 */
export enum StellarLendingTopic {
  MarketCreate = 'market:create',
  MarketParamsUpdate = 'market:params_update',
  MarketStateBatchUpdate = 'market:batch_state_update',
  MarketParamsBatchUpdate = 'market:batch_params_update',
  PositionBatchUpdate = 'position:batch_update',
  PositionFlashLoan = 'position:flash_loan',
  PositionLiquidation = 'position:liquidation',
  ConfigHub = 'config:hub',
  ConfigOracle = 'config:oracle',
  ConfigOracleDisabled = 'config:oracle_disabled',
  ConfigSpoke = 'config:spoke',
  ConfigSpokeAsset = 'config:spoke_asset',
  ConfigRemoveSpokeAsset = 'config:remove_spoke_asset',
  DebtBadDebt = 'debt:bad_debt',
  StrategyInitialPayment = 'strategy:initial_payment',
  StrategyFee = 'strategy:fee',
  StrategyBlendMigration = 'strategy:blend_migration',
  /** Known topic; currently skipped by the indexer (governance surface). */
  ConfigApproveToken = 'config:approve_token',
  /** Known topic; currently skipped by the indexer. */
  ConfigAggregator = 'config:aggregator',
  /** Known topic; currently skipped by the indexer. */
  ConfigAccumulator = 'config:accumulator',
  /** Known topic; currently skipped by the indexer. */
  ConfigPoolTemplate = 'config:pool_template',
  /** Known topic; currently skipped by the indexer. */
  ConfigPositionLimits = 'config:position_limits',
  /** Known topic; currently skipped by the indexer. */
  ConfigSwapAggregator = 'config:swap_aggregator',
  /** Known topic; currently skipped by the indexer. */
  ConfigPriceAggregator = 'config:price_aggregator',
}
