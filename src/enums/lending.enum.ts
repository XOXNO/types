export enum PositionMode {
  None = 'None',
  Normal = 'Normal',
  Multiply = 'Multiply',
  Long = 'Long',
  Short = 'Short',
}

export enum PricingMethod {
  None = 'None',
  Safe = 'Safe',
  Instant = 'Instant',
  Aggregator = 'Aggregator',
  Mix = 'Mix',
}

export enum OracleType {
  None = 'None',
  Normal = 'Normal',
  Derived = 'Derived',
  Lp = 'Lp',
}

export enum ExchangeSource {
  None = 'None',
  XExchange = 'XExchange',
  LXOXNO = 'LXOXNO',
  XEGLD = 'XEGLD',
  LEGLD = 'LEGLD',
  Onedex = 'Onedex',
}

export enum LendingOracleProviderKind {
  ReflectorSep40 = 'ReflectorSep40',
  RedStonePriceFeed = 'RedStonePriceFeed',
}

export enum LendingOracleAssetRefKind {
  Stellar = 'Stellar',
  Symbol = 'Symbol',
  String = 'String',
}

export enum LendingOracleReadMode {
  Spot = 'Spot',
  Twap = 'Twap',
}

export enum LendingOracleStrategy {
  Single = 'Single',
  PrimaryWithAnchor = 'PrimaryWithAnchor',
}
