/**
 * Soroban event dispatch keys for XOXNO Stellar lending contracts
 * (`"<domain>:<action>"`).
 *
 * Keep in parity with az-functions `StellarV2DispatchKey` and live
 * `#[contractevent]` topics on pool, controller, and price-aggregator.
 * Legacy topics retained for historical ledger replay are marked deprecated.
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
  /**
   * Live price-aggregator write topic (`set_oracle` / `set_sanity_band` /
   * `set_tolerance`). Payload `{ key: PriceKey, oracle: AssetOracle }`.
   */
  ConfigAssetOracle = 'config:asset_oracle',
  /**
   * @deprecated Pre-composable aggregator topic. Keep for historical ledger
   * replay only; live chain emits `config:asset_oracle`.
   */
  ConfigOracle = 'config:oracle',
  /**
   * @deprecated Never emitted by the composable aggregator. Historical only.
   */
  ConfigOracleDisabled = 'config:oracle_disabled',
  ConfigSpoke = 'config:spoke',
  ConfigSpokeAsset = 'config:spoke_asset',
  ConfigRemoveSpokeAsset = 'config:remove_spoke_asset',
  DebtBadDebt = 'debt:bad_debt',
  StrategyInitialPayment = 'strategy:initial_payment',
  StrategyFee = 'strategy:fee',
  StrategyBlendMigration = 'strategy:blend_migration',
  /** Live controller: blend pool approve/revoke. */
  ConfigApproveBlendPool = 'config:approve_blend_pool',
  /**
   * @deprecated Replaced by `config:approve_blend_pool`. Historical only.
   */
  ConfigApproveToken = 'config:approve_token',
  /**
   * @deprecated Replaced by `config:swap_aggregator` /
   * `config:price_aggregator`. Historical only.
   */
  ConfigAggregator = 'config:aggregator',
  ConfigAccumulator = 'config:accumulator',
  /**
   * @deprecated No longer emitted by the controller. Historical only.
   */
  ConfigPoolTemplate = 'config:pool_template',
  ConfigPositionLimits = 'config:position_limits',
  ConfigMinBorrowCollateral = 'config:min_borrow_collateral',
  ConfigSwapAggregator = 'config:swap_aggregator',
  ConfigPriceAggregator = 'config:price_aggregator',
}
