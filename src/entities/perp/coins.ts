import { ApiProperty } from '@nestjs/swagger';

export class PerpConfig {
  @ApiProperty()
  sigFigs!: number;

  @ApiProperty()
  mantissa!: number;
}

export class PerpSingleCoin {
  @ApiProperty()
  identifier!: string;

  @ApiProperty()
  decimals!: number;
}

export class PerpBalance extends PerpSingleCoin {
  @ApiProperty()
  balance!: string;
}

export class PerpCoin {
  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  coin!: PerpSingleCoin;

  @ApiProperty()
  againstCoin!: PerpSingleCoin;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  config!: PerpConfig[];
}
