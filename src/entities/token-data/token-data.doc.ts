import { ApiProperty } from '@nestjs/swagger';

class TokenDataDocBase {
  identifier!: string;
  decimals!: number;
  ticker!: string;
  name!: string;
  svgUrl!: string;
  pngUrl!: string;

  constructor(props?: Partial<TokenDataDocBase>) {
    Object.assign(this, props);
  }
}

export class TokenDataDoc extends TokenDataDocBase {
  id!: string;
  collection!: string;
  dataType!: string;
  type!: string;
  category: string[] = ['userInventory'];
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
  objectId!: string;
  balance!: string;
  digest!: string;
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

  objects?: SuiCoinObjectDto[];
}
