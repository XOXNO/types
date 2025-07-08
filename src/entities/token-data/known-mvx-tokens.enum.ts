/**
 * The values are environment based (devnet/mainnet) and update at runtime based
 * on env the config file Note: If value exists below, but not configured in
 * config file, at runtime it will be undefined Default values are for mainnet
 */
export const KNOWN_MVX_TOKENS = {
  SUI: '0x2::sui::SUI',
  EGLD: 'EGLD',
  WEGLD: 'WEGLD-bd4d79',
  MEX: 'MEX-455c57',
  LKMEX: 'LKMEX-aab910',
  XMEX: 'XMEX-fda355',
  WXMEX: 'WXMEX-794dbd',
  SEGLD: 'SEGLD-3ad2d0',
  USDC: 'USDC-c76f1f',
  BUSD: 'BUSD-40b57e',
  USDT: 'USDT-f8c08c',
  DAI: 'WDAI-9eeb54',
  WATER: 'WATER-9ed400',
  XOXNO: 'XOXNO-589e09',
  LXOXNO: 'LXOXNO-a00540',
  XEGLD: 'XEGLD-23b511',
  // LP TOKENS should be defined last after their respective tokens
  XOXNOWEGLDLP: 'XOXNOWEGLD-93445e',
  XEGLDWEGLDLP: 'XEGLDWEGLD-d83259',
  XEGLDLXOXNOLP: 'XEGLDLXOXNO-93445e',
  EGLDUSDC: 'EGLDUSDC-ac1a30',
} as const;

export interface KnownLpTokensType {
  [key: string]: {
    token1: string;
    token2: string;
  };
}

export const KNOWN_LP_TOKENS = {} as KnownLpTokensType;
