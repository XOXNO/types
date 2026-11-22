import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain, TokenDataType } from '../../enums';

class TokenDataDocBase {
  @ApiProperty({
    type: String,
    description: 'Unique token identifier',
    example: 'EGLD',
  })
  identifier!: string;
  @ApiProperty({
    type: 'integer',
    description: 'Number of decimal places for the token',
    example: 18,
  })
  decimals!: number;
  @ApiProperty({
    type: String,
    description: 'Token ticker symbol',
    example: 'EGLD',
  })
  ticker!: string;
  @ApiProperty({
    type: String,
    description: 'Full name of the token',
    example: 'Elrond Gold',
  })
  name!: string;
  @ApiProperty({
    type: String,
    description: 'URL to the SVG icon of the token',
    example: 'https://media.xoxno.com/tokens/EGLD.svg',
  })
  svgUrl!: string;
  @ApiProperty({
    type: String,
    description: 'URL to the PNG icon of the token',
    example: 'https://media.xoxno.com/tokens/EGLD.png',
  })
  pngUrl!: string;
  @ApiProperty({
    enum: ActivityChain,
    enumName: 'ActivityChain',
    description: 'Blockchain network of the token',
    default: ActivityChain.MVX,
  })
  chain: ActivityChain = ActivityChain.MVX;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Chain-specific network discriminator. For Stellar this is mainnet or testnet.',
    example: 'mainnet',
  })
  network?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Stellar network for Soroban token profiles.',
    example: 'mainnet',
  })
  stellarNetwork?: 'mainnet' | 'testnet';

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Issuer account (G…) of a Stellar classic asset. Absent for native XLM and pure-Soroban tokens. Lets clients build a changeTrust trustline without an on-chain name() lookup.',
    example: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
  })
  issuer?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description:
      'Whether the token is swappable (present in a DEX/Soroswap token list). Lets the swap picker show only swappable tokens while other views use the full registry.',
    example: true,
  })
  swappable?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    description:
      'Whether this token is an AMM LP share token. When true, lpDex, lpPool and lpAssets describe the pool it represents.',
    example: true,
  })
  lpToken?: boolean;

  @ApiProperty({
    type: String,
    required: false,
    description: 'DEX the LP share token belongs to (e.g. Aquarius).',
    example: 'Aquarius',
  })
  lpDex?: string;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Pool contract address (C…) behind an LP share token. Resolves a held share token to its exact pool — fee-tier precise — without any third-party or on-chain lookup (e.g. for building an Aquarius withdraw, which needs the pool address and index, not just the share token).',
    example: 'CAB6MICC2WKRT372U3FRPKGGVB5R3FDJSMWSLPF2UJNJPYMBZ76RQVYE',
  })
  lpPool?: string;

  @ApiProperty({
    type: [String],
    required: false,
    description:
      'Underlying leg token identifiers of an LP share token, in the pool contract order (sorted ascending by contract ID for Soroban AMMs).',
    example: [
      'CAUIKL3IYGMERDRUN6YSCLWVAKIFG5Q4YJHUKM4S4NJZQIA3BAS6OJPK',
      'CD25MNVTZDL4Y3XBCPCJXGXATV5WUHHOWMYFF4YBEGU5FCPGMYTVG5JY',
    ],
  })
  lpAssets?: string[];

  constructor(props?: Partial<TokenDataDocBase>) {
    Object.assign(this, props);
  }
}

export class TokenDataDoc extends TokenDataDocBase {
  @ApiProperty({
    type: String,
    description: 'Unique document identifier',
  })
  id!: string;
  @ApiProperty({
    type: String,
    description: 'Collection identifier for grouping',
  })
  collection!: string;
  @ApiProperty({
    enum: TokenDataType,
    enumName: 'TokenDataType',
    description: 'Type of token data document',
    default: TokenDataType.FungibleTokenInfo,
  })
  dataType = TokenDataType.FungibleTokenInfo;
  @ApiProperty({
    type: String,
    description: 'Token type classification',
  })
  type!: string;
  @ApiProperty({
    type: [String],
    description: 'Categories this token belongs to',
    default: ['userInventory'],
  })
  category: string[] = ['userInventory'];
  @ApiProperty({
    type: 'integer',
    description: 'Cosmos DB timestamp for document versioning',
  })
  _ts!: number;

  constructor(props?: Partial<TokenDataDoc>) {
    super(props);
    Object.assign(this, props);
  }
}

export class TokenDataDocHydrated extends TokenDataDoc {
  @ApiProperty({ example: 12.160648172030305 })
  usdPrice!: number;
}

export class TokenDataDocWithBalance extends TokenDataDocBase {
  @ApiProperty({ example: 12.160648172030305 })
  usdPrice!: number;

  @ApiProperty({ example: 0 })
  nonce!: number;

  @ApiProperty({ example: '514203000000000000000' })
  balance!: string;

  @ApiProperty({ example: 514.203 })
  shortBalance!: number;

  @ApiProperty({ example: 6253.041772002499 })
  usdValue!: number;

  @ApiProperty({ example: 171.32505804164822 })
  egldValue!: number;

  @ApiProperty({ example: 83.21 })
  weight!: number;

  @ApiProperty({
    required: false,
    type: String,
    description:
      'Spendable amount in the same integer scale as `balance` (10^decimals). ' +
      'Set for Stellar rows: `balance` minus open-offer selling liabilities ' +
      'and, for XLM, the minimum account reserve. Absent when unknown; ' +
      'fall back to `balance`.',
    example: '512000000',
  })
  availableBalance?: string;

  @ApiProperty({
    required: false,
    description:
      'Spendable amount in whole tokens, like `shortBalance`. Set together ' +
      'with `availableBalance`.',
    example: 51.2,
  })
  availableShortBalance?: number;
}
