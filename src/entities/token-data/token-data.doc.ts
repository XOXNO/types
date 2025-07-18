import { ApiProperty } from '@nestjs/swagger';

export class TokenDataDoc {
  id!: string;
  identifier!: string;
  collection!: string;
  dataType!: string;
  decimals!: number;
  name!: string;
  type!: string;
  category: string[] = ['userInventory'];
  svgUrl!: string;
  pngUrl!: string;
  ticker!: string;
  _ts!: number;

  constructor(props?: Partial<TokenDataDoc>) {
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

export class TokenDataDocWithBalance extends TokenDataDocHydrated {
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
