export enum FiatTokens {
  USDC = 'USDC',
  RON = 'RON',
  EUR = 'EUR',
  USD = 'USD',
}

export interface TokenValue {
  usdPrice: number;
  egldPrice: number;
}
