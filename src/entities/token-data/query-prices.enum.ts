export interface QueryPricesResponse {
  first_token_id: string;
  second_token_id: string;
  first_token_balance: BigNumber;
  first_token_balance_short?: number;
  first_token_price?: number;
  first_token_decimals?: number;
  second_token_balance: BigNumber;
  second_token_balance_short?: number;
  second_token_price?: number;
  second_token_decimals?: number;
  fees: number;
  amp_factor: number;
  dex: string;
  address: string;
  pair_id: string;
}
