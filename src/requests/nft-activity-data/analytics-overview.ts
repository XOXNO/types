// DTO Type
import { ApiProperty } from '@nestjs/swagger';

class AllTimeHighDto {
  @ApiProperty({ example: 351 })
  price!: number;

  @ApiProperty({ example: 1709218759 })
  timestamp!: number;

  @ApiProperty({
    example: '55300c108960258387a09831c5786d6a26b9bda7d19c0f685d5672a33bd30e11',
  })
  txHash!: string;

  @ApiProperty({ example: 'GOOSEV-edcceb-0e08' })
  identifier!: string;
}

class TradingStatsDto {
  @ApiProperty({ example: 816457.97 })
  totalVolume!: number;

  @ApiProperty({ example: 776804 })
  totalTrades!: number;

  @ApiProperty({ example: 1.05 })
  averagePrice!: number;

  @ApiProperty({ type: AllTimeHighDto })
  allTimeHigh!: AllTimeHighDto;

  @ApiProperty({
    example: {
      volume: 1.66,
      volumeMargin: -42,
      trades: 5,
      tradesMargin: -50,
      minPrice: 0.06,
      maxPrice: 1.21,
      averagePrice: 0.33,
    },
  })
  day!: Record<string, number>;

  @ApiProperty({
    example: {
      volume: 1237.69,
      volumeMargin: -79,
      trades: 2055,
      tradesMargin: -87,
      minPrice: 0,
      maxPrice: 36.87,
      averagePrice: 0.6,
    },
  })
  week!: Record<string, number>;

  @ApiProperty({
    example: {
      volume: 13669.09,
      volumeMargin: 105,
      trades: 38233,
      tradesMargin: 247,
      minPrice: 0,
      maxPrice: 157.3,
      averagePrice: 0.36,
    },
  })
  month!: Record<string, number>;

  @ApiProperty({
    example: {
      volume: 28336.25,
      volumeMargin: -8,
      trades: 63924,
      tradesMargin: 47,
      minPrice: 0,
      maxPrice: 210,
      averagePrice: 0.44,
    },
  })
  quarter!: Record<string, number>;

  @ApiProperty({
    example: {
      volume: 59151.49,
      volumeMargin: -45,
      trades: 107545,
      tradesMargin: -26,
      minPrice: 0,
      maxPrice: 210,
      averagePrice: 0.55,
    },
  })
  halfYear!: Record<string, number>;

  @ApiProperty({
    example: {
      volume: 170661.95,
      volumeMargin: -56,
      trades: 259397,
      tradesMargin: -27,
      minPrice: 0,
      maxPrice: 351,
      averagePrice: 0.66,
    },
  })
  year!: Record<string, number>;
}

export class GlobalAnalyticsOverviewResponseDto {
  @ApiProperty({ example: 138418 })
  userCount!: number;

  @ApiProperty({ example: 185538 })
  listingsCount!: number;

  @ApiProperty({ type: TradingStatsDto })
  tradingStats!: TradingStatsDto;
}
