import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsInt } from 'class-validator';

export class VolumeGraph {
  marketplace!: string;
  timestamp!: string[];
  totalEgldVolume!: number[];
  totalUsdVolume!: number[];
  totalTrades!: number[];
  floorPrice!: number[];
  athPrice!: number[];
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
