import { ApiProperty } from '@nestjs/swagger';

export class PerpConfig {
  @ApiProperty()
  sigFigs!: number;

  @ApiProperty()
  mantissa!: number;
}

export class PerpCoin {
  @ApiProperty()
  coin!: string;

  @ApiProperty()
  usdPrice!: number;

  @ApiProperty()
  config!: PerpConfig[];
}
