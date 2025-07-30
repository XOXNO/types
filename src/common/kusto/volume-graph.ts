import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsInt } from 'class-validator';

export class VolumeGraph {
  @ApiProperty({
    description: 'Marketplace identifier',
    example: 'xoxno',
    type: String,
  })
  marketplace!: string;
  @ApiProperty({
    description: 'Array of timestamps for the data points',
    example: ['2024-01-01T00:00:00Z', '2024-01-02T00:00:00Z'],
    type: [String],
    isArray: true,
  })
  timestamp!: string[];
  @ApiProperty({
    description:
      'Array of total EGLD volume values corresponding to timestamps',
    example: [100.5, 125.75, 150.0],
    type: [Number],
    isArray: true,
  })
  totalEgldVolume!: number[];
  @ApiProperty({
    description: 'Array of total USD volume values corresponding to timestamps',
    example: [5025.0, 6287.5, 7500.0],
    type: [Number],
    isArray: true,
  })
  totalUsdVolume!: number[];
  @ApiProperty({
    description: 'Array of total trades count corresponding to timestamps',
    example: [50, 65, 80],
    type: [Number],
    isArray: true,
  })
  totalTrades!: number[];
  @ApiProperty({
    description: 'Array of floor prices corresponding to timestamps',
    example: [1.5, 1.75, 2.0],
    type: [Number],
    isArray: true,
  })
  floorPrice!: number[];
  @ApiProperty({
    description: 'Array of all-time high prices corresponding to timestamps',
    example: [50.0, 55.0, 60.0],
    type: [Number],
    isArray: true,
  })
  athPrice!: number[];
  @ApiProperty({
    description: 'Array of average prices corresponding to timestamps',
    example: [10.5, 12.0, 15.5],
    type: [Number],
    isArray: true,
  })
  avgPrice!: number[];
}

export class AnalyticsMarketplaceUniqueUsers {
  @ApiProperty({
    description: 'The date of the data entry',
    example: '2024-05-06T00:00:00.0000000Z',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  Day!: string;

  @ApiProperty({
    description: 'Number of unique users',
    example: 1016,
    type: Number,
  })
  @IsInt()
  UniqueUsers!: number;

  @ApiProperty({
    description: 'Number of unique buyers',
    example: 505,
    type: Number,
  })
  @IsInt()
  UniqueBuyers!: number;

  @ApiProperty({
    description: 'Number of unique sellers',
    example: 656,
    type: Number,
  })
  @IsInt()
  UniqueSellers!: number;
}
