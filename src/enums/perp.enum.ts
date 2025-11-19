export enum PerpEnum {
  L2BOOK = 'l2Book',
  TRADES = 'trades',
  SPOT_ASSET_CTX = 'activeSpotAssetCtx',
  ASSET_CTX = 'activeAssetCtx',
  SPOT_ASSET_CTXS = 'activeSpotAssetCtxs',
  ASSET_CTXS = 'activeAssetCtxs',
  TRADINGVIEW = 'tradingView',
  WEBDATA3 = 'webData3',
  SPOT_STATE = 'spotState',
  USER_ORDERS = 'userOrders',
  USER_FILLS = 'userFills',
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
}

export enum PerpDepositAsset {
  USDC = 'USDC',
  USDT = 'USDT',
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

export enum PerpOrderTriggerCondition {
  NA = 'N/A',
}

export enum PerpOrderOrderType {
  LIMIT = 'Limit',
  MARKET = 'Market',
}

export enum PerpOrderDirection {
  OPEN_LONG = 'Open Long',
  CLOSE_SHORT = 'Close Short',
  BUY = 'Buy',
  SELL = 'Sell',
}
