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

export class SuiCoinObjectDto {
  @ApiProperty({
    type: String,
    description: 'Unique object identifier on SUI blockchain',
  })
  objectId!: string;
  @ApiProperty({
    type: String,
    description: 'Balance amount as string',
  })
  balance!: string;
  @ApiProperty({
    type: String,
    description: 'Transaction digest hash',
  })
  digest!: string;
  @ApiProperty({
    type: String,
    description: 'Object version on SUI blockchain',
  })
  version!: string;
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
    type: [SuiCoinObjectDto],
    description: 'Array of SUI coin objects',
    required: false,
  })
  objects?: SuiCoinObjectDto[];
}
