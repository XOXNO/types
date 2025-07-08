import { BigNumber } from 'bignumber.js';

export enum QueryPricesSCEndpoints {
  GET_PRICES = 'getPrices',
  GET_ASH_PRICES = 'getAshPrices',
  GET_ONE_PRICES = 'getOneDexPrices',
  GET_XEXCHANGE_PRICES = 'getExchangePrices',
  GET_MARKETS = 'getMarkets',
  GET_MARKETS_INFO = 'getMarketsInfo',
  GET_MARKET_MEMBERS = 'getMarketMembers',
  GET_MARKET_MEMBERS_INFO = 'getMarketMembersInfo',
  GET_MEMBER_INFO = 'getMemberInfo',
  GET_MARKET_MEMBER_INFO = 'getMarketMemberInfo',
  GET_MARKET_INFO = 'getMarketInfo',
}

export enum OneDexEndpoints {
  GET_MAIN_PAIR_TOKENS = 'getMainPairTokens',
  GET_LAST_PAIR_ID = 'getLastPairId',
  VIEW_PAIRS_PAGINATED = 'viewPairsPaginated',
}
export enum AshSwapEndpoints {
  GET_ASH_SWAP_STABLE_POOLS = 'getAshSwapStablePools',
  GET_ASH_SWAP_V2_POOLS = 'getAshSwapV2Pools',
}
export enum DexType {
  XExchange = 'XExchange',
  OneDex = 'OneDex',
  AshSwap = 'AshSwap',
}

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
