export enum XoxnoLendingActivity {
  CREATE_MARKET = 'lendingCreateMarket',
  UPDATE_MARKET = 'lendingUpdateMarket',
  UPDATE_MARKET_DEBT_CEILING = 'lendingUpdateMarketDebtCeiling',
  UPGRADE_MARKET = 'lendingUpgradeMarket',
  CREATE_ACCOUNT = 'lendingCreateAccount',
  UPDATE_ACCOUNT_POSITION = 'lendingUpdateAccountPosition',
  UPDATE_MARKET_STATE = 'lendingUpdateMarketState',
  LIQUIDATE_REPAY_DEBT = 'lendingLiquidateRepayDebt',
  LIQUIDATE_SEIZE_COLLATERAL = 'lendingLiquidateSeizeCollateral',
  EMODE_CATEGORY = 'lendingEModeCategory',
  TOKEN_EMODE = 'lendingTokenEMode',
  UPDATE_ACCOUNT_PARAMETERS = 'lendingUpdateAccountParameters',
}
