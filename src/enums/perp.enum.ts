export enum PerpEnum {
  L2BOOK = 'l2Book',
  TRADES = 'trades',
  ALL_MIDS = 'allMids',
  SPOT_ASSET_CTX = 'activeSpotAssetCtx',
  ASSET_CTX = 'activeAssetCtx',
  SPOT_ASSET_CTXS = 'activeSpotAssetCtxs',
  ASSET_CTXS = 'activeAssetCtxs',
  TRADINGVIEW = 'tradingView',
  WEBDATA3 = 'webData3',
  SPOT_STATE = 'spotState',
  USER_ORDERS = 'userOrders',
  USER_FILLS = 'userFills',
  USER_HISTORY = 'userHistoricalOrders',
}

export enum PerpTradesSide {
  A = 'A',
  B = 'B',
}

export enum PerpCoinTypes {
  ALL = 'all',
  FAVORITES = 'favorites',
  SPOT = 'spot',
  PERP = 'perp',
  TRENDING = 'trending',
  PRE_LAUNCH = 'prelaunch',
  AI = 'ai',
  DEFI = 'defi',
  GAMING = 'gaming',
  L1 = 'l1',
  L2 = 'l2',
  MEME = 'meme',
}

export enum PerpAssetIntervals {
  ONE_MINUTE = '1',
  THREE_MINUTES = '3',
  FIVE_MINUTES = '5',
  FIFTEEN_MINUTES = '15',
  THIRTY_MINUTES = '30',
  ONE_HOUR = '60',
  TWO_HOURS = '120',
  FOUR_HOURS = '240',
  EIGHT_HOURS = '480',
  TWELVE_HOURS = '720',
  ONE_DAY = '1D',
  THREE_DAYS = '3D',
  ONE_WEEK = '1W',
  ONE_MONTH = '1M',
}

export enum PerpAssetTimezone {
  UTC = 'UTC',
}

export enum PerpAssetType {
  CRYPTO = 'crypto',
}

export enum PerpAssetSession {
  ALWAYS = '24x7',
}

export enum PerpAssetExchange {
  DEFAULT = 'Default',
}

export enum PerpPositionLeverageType {
  ISOLATED = 'isolated',
  CROSS = 'cross',
}

export enum PerpPositionLeverageDirection {
  ONE_WAY = 'oneWay',
  HEDGE = 'hedge',
}

export enum SpotDepositAsset {
  EGLD = 'EGLD',
  SOL = 'SOL',
  ETH = 'ETH',
  BNB = 'BNB',
  ARB = 'ARB',
  USDT = 'USDT',
}

export enum PerpDepositAsset {
  USDC = 'USDC',
  // USDT = 'USDT',
}

export enum PerpOrderGrouping {
  NA = 'na',
  NORMAL_TPSL = 'normalTpsl',
  POSITION_TPSL = 'positionTpsl',
}

export enum PerpOrderTimeInForce {
  // Must be maker; rejects if it would immediately fill
  ALO = 'Alo',
  // Takes what is instantly available; cancels rest
  IOC = 'Ioc',
  // Stays open until fully filled or cancelled
  GTC = 'Gtc',
  // FrontendMarket
  FRONTEND = 'FrontendMarket',
}

export enum PerpOrderTpsl {
  TP = 'tp',
  SL = 'sl',
}

export enum PerpOrderType {
  ORDER = 'order',
  CANCEL = 'cancel',
  CANCEL_BY_CLOID = 'cancelByCloid',
  SCHEDULE_CANCEL = 'scheduleCancel',
  MODIFY = 'modify',
  BATCH_MODIFY = 'batchModify',
  UPDATE_LEVERAGE = 'updateLeverage',
  UPDATE_ISOLATED_MARGIN = 'updateIsolatedMargin',
}

export enum PerpOrderStatus {
  RESTING = 'resting',
  FILLED = 'filled',
  ERROR = 'error',
}

export enum PerpOrderDetailedType {
  LIMIT = 'Limit',
  MARKET = 'Market',
}

export enum PerpOrderDirection {
  OPEN_LONG = 'Open Long',
  CLOSE_SHORT = 'Close Short',
  BUY = 'Buy',
  SELL = 'Sell',
}

export enum PerpOrderDetailedStatus {
  OPEN = 'open', // Order placed successfully and waiting for execution
  TRIGGERED = 'triggered', // Trigger order has been triggered and converted to a regular order
  FILLED = 'filled', // Order has been completely executed
  CANCELED = 'canceled', // Order canceled by user
  MARGIN_CANCELED = 'marginCanceled', // Insufficient margin to fill
  VAULT_WITHDRAWAL_CANCELED = 'vaultWithdrawalCanceled', // Vault only. User withdrawal from vault
  OPEN_INTEREST_CAP_CANCELED = 'openInterestCapCanceled', // Too aggressive when open interest was at cap
  SELF_TRADE_CANCELED = 'selfTradeCanceled', // Self-trade prevention
  REDUCE_ONLY_CANCELED = 'reduceOnlyCanceled', // Reduce-only order that does not reduce position
  SIBLING_FILLED_CANCELED = 'siblingFilledCanceled', // TP/SL only. Sibling order being filled
  DELISTED_CANCELED = 'delistedCanceled', // Asset delisting
  LIQUIDATED_CANCELED = 'liquidatedCanceled', // Liquidation
  SCHEDULED_CANCEL = 'scheduledCancel', // API only. Dead man’s switch
  REJECTED = 'rejected', // Rejected at placement
  TICK_REJECTED = 'tickRejected', // Invalid tick price
  MIN_TRADE_NTL_REJECTED = 'minTradeNtlRejected', // Order notional below minimum
  PERP_MARGIN_REJECTED = 'perpMarginRejected', // Insufficient margin
  REDUCE_ONLY_REJECTED = 'reduceOnlyRejected', // Reduce-only constraints
  BAD_ALO_PX_REJECTED = 'badAloPxRejected', // Post-only immediate match
  IOC_CANCEL_REJECTED = 'iocCancelRejected', // IOC unable to match
  BAD_TRIGGER_PX_REJECTED = 'badTriggerPxRejected', // Invalid TP/SL price
  MARKET_ORDER_NO_LIQUIDITY_REJECTED = 'marketOrderNoLiquidityRejected', // No liquidity for market order
  POSITION_INCREASE_AT_OI_CAP_REJECTED = 'positionIncreaseAtOpenInterestCapRejected', // Open interest cap
  POSITION_FLIP_AT_OI_CAP_REJECTED = 'positionFlipAtOpenInterestCapRejected', // Open interest cap
  TOO_AGGRESSIVE_AT_OI_CAP_REJECTED = 'tooAggressiveAtOpenInterestCapRejected', // Price too aggressive at open interest cap
  OPEN_INTEREST_INCREASE_REJECTED = 'openInterestIncreaseRejected', // Open interest cap
  INSUFFICIENT_SPOT_BALANCE_REJECTED = 'insufficientSpotBalanceRejected', // Insufficient spot balance
  ORACLE_REJECTED = 'oracleRejected', // Price too far from oracle
  PERP_MAX_POSITION_REJECTED = 'perpMaxPositionRejected', // Exceeding margin tier limit at current leverage
}
