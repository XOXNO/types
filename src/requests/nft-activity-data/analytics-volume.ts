// DTO Type
import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsVolumeDto {
  @ApiProperty({ example: 'xoxno' })
  marketplace!: string;

  @ApiProperty({
    example: ['2024-07-04T00:00:00.0000000Z', '2024-07-05T00:00:00.0000000Z'],
  })
  timestamp!: string[];

  @ApiProperty({ example: [169.92, 189.7] })
  totalEgldVolume!: number[];

  @ApiProperty({ example: [5166.86, 5849.23] })
  totalUsdVolume!: number[];

  @ApiProperty({ example: [254, 290] })
  totalTrades!: number[];

  @ApiProperty({ example: [] })
  floorPrice!: number[];

  @ApiProperty({ example: [] })
  athPrice!: number[];

  @ApiProperty({ example: [] })
  avgPrice!: number[];
}

export class AnalyticsVolumeResponseDto {
  @ApiProperty({ type: AnalyticsVolumeDto, isArray: true })
  resources!: AnalyticsVolumeDto[];
}
