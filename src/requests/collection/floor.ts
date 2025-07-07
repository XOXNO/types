import { ApiProperty } from '@nestjs/swagger';

export class FloorPriceDto {
  @ApiProperty({ example: 'MICE-a0c447' })
  collection!: string;

  @ApiProperty({ example: 0.18 })
  price!: number;

  @ApiProperty({ example: 0.18 })
  usdPrice!: number;
}
