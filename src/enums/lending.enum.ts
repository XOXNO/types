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
