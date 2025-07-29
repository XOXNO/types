import { ApiProperty } from '@nestjs/swagger';
import { ActivityChain, TokenDataType } from '../../enums';

class TokenDataDocBase {
  @ApiProperty()
  identifier!: string;
  @ApiProperty()
  decimals!: number;
  @ApiProperty()
  ticker!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  svgUrl!: string;
  @ApiProperty()
  pngUrl!: string;
  @ApiProperty()
  chain: ActivityChain = ActivityChain.MVX;

  constructor(props?: Partial<TokenDataDocBase>) {
    Object.assign(this, props);
  }
}

export class TokenDataDoc extends TokenDataDocBase {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  collection!: string;
  @ApiProperty()
  dataType = TokenDataType.FungibleTokenInfo;
  @ApiProperty()
  type!: string;
  @ApiProperty()
  category: string[] = ['userInventory'];
  @ApiProperty()
  _ts!: number;

  constructor(props?: Partial<TokenDataDoc>) {
    super(props);
    Object.assign(this, props);
  }
}

export class TokenDataDocHydrated extends TokenDataDoc {
  @ApiProperty({ example: 12.160648172030305 })
  usdPrice!: number;

  @ApiProperty({ example: false })
  isAshSupported!: boolean;
}

export class SuiCoinObjectDto {
  @ApiProperty()
  objectId!: string;
  @ApiProperty()
  balance!: string;
  @ApiProperty()
  digest!: string;
  @ApiProperty()
  version!: string;
}

export class TokenDataDocWithBalance extends TokenDataDocBase {
  @ApiProperty({ example: 12.160648172030305 })
  usdPrice!: number;

  @ApiProperty({ example: false })
  isAshSupported!: boolean;

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

  @ApiProperty()
  objects?: SuiCoinObjectDto[];
}
