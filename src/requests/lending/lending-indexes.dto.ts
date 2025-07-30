import { ApiProperty } from '@nestjs/swagger';

export class LendingIndexesDto {
  @ApiProperty({
    description: 'Supply index as a string to preserve precision',
    example: '1050000000000000000',
    type: String,
  })
  supplyIndex!: string;
  @ApiProperty({
    description: 'Supply index as a number (may lose precision)',
    example: 1.05,
    type: Number,
  })
  supplyIndexShort!: number;
  @ApiProperty({
    description: 'Borrow index as a string to preserve precision',
    example: '1025000000000000000',
    type: String,
  })
  borrowIndex!: string;
  @ApiProperty({
    description: 'Borrow index as a number (may lose precision)',
    example: 1.025,
    type: Number,
  })
  borrowIndexShort!: number;
  @ApiProperty({
    description: 'EGLD price in USD as a string to preserve precision',
    example: '65.50',
    type: String,
  })
  egldPrice!: string;
  @ApiProperty({
    description: 'EGLD price in USD as a number',
    example: 65.5,
    type: Number,
  })
  egldPriceShort!: number;
  @ApiProperty({
    description: 'USD price (typically 1.0) as a string',
    example: '1.0',
    type: String,
  })
  usdPrice!: string;
  @ApiProperty({
    description: 'USD price (typically 1.0) as a number',
    example: 1.0,
    type: Number,
  })
  usdPriceShort!: number;
}
