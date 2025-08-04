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
  @ApiProperty({
    description: 'Safe price in EGLD as a string to preserve precision',
    example: '1000000000000000000',
    type: String,
  })
  safePriceEgld!: string;
  @ApiProperty({
    description: 'Safe price in EGLD as a number (may lose precision)',
    example: 1,
    type: Number,
  })
  safePriceEgldShort!: number;
  @ApiProperty({
    description: 'Safe price in USD as a string to preserve precision',
    example: '16124645832563882000',
    type: String,
  })
  safePriceUsd!: string;
  @ApiProperty({
    description: 'Safe price in USD as a number (may lose precision)',
    example: 16.124645832563882,
    type: Number,
  })
  safePriceUsdShort!: number;
  @ApiProperty({
    description: 'Aggregator price in EGLD as a string to preserve precision',
    example: '1000000000000000000',
    type: String,
  })
  aggregatorPriceEgld!: string;
  @ApiProperty({
    description: 'Aggregator price in EGLD as a number (may lose precision)',
    example: 1,
    type: Number,
  })
  aggregatorPriceEgldShort!: number;
  @ApiProperty({
    description: 'Aggregator price in USD as a string to preserve precision',
    example: '16124645832563882000',
    type: String,
  })
  aggregatorPriceUsd!: string;
  @ApiProperty({
    description: 'Aggregator price in USD as a number (may lose precision)',
    example: 16.124645832563882,
    type: Number,
  })
  aggregatorPriceUsdShort!: number;
  @ApiProperty({
    description: 'Within first tolerance',
    example: true,
    type: Boolean,
  })
  withinFirstTolerance!: boolean;
  @ApiProperty({
    description: 'Within second tolerance',
    example: true,
    type: Boolean,
  })
  withinSecondTolerance!: boolean;
}
