import { ApiProperty } from '@nestjs/swagger';

export class StatisticsTradeDataDto {
  @ApiProperty({
    description: 'Daily trading volume in EGLD for this collection',
    example: 0,
    type: Number,
  })
  dayEgldVolume!: number;

  @ApiProperty({
    description: 'Weekly trading volume in EGLD for this collection',
    example: 116.67,
    type: Number,
  })
  weekEgldVolume!: number;

  @ApiProperty({
    description: 'Total all-time trading volume in EGLD for this collection',
    example: 128123.25,
    type: Number,
  })
  totalEgldVolume!: number;

  @ApiProperty({
    description: 'Average price in EGLD for trades in this collection',
    example: 25.5,
    type: Number,
  })
  averageEgldPrice!: number;
  @ApiProperty({
    description: 'All-time high price in EGLD for this collection',
    example: 150.0,
    type: Number,
  })
  athEgldPrice!: number;
  @ApiProperty({
    description: 'Transaction hash of the all-time high price sale',
    example: '0x1234567890abcdef',
    type: String,
  })
  athTxHash!: string;
  @ApiProperty({
    description: 'Total number of trades for this collection',
    example: 1500,
    type: Number,
  })
  totalTrades!: number;
}

export class StatisticsMintDataDto {
  @ApiProperty({
    description: 'Total mint volume in EGLD for this collection',
    example: 5000.0,
    type: Number,
  })
  totalMintEgldVolume!: number;
  @ApiProperty({
    description: 'Weekly mint volume in EGLD for this collection',
    example: 250.0,
    type: Number,
  })
  weekMintEgldVolume!: number;
  @ApiProperty({
    description: 'Daily mint volume in EGLD for this collection',
    example: 50.0,
    type: Number,
  })
  dayMintEgldVolume!: number;
}

export class StatisticsOtherDto {
  @ApiProperty({
    description: 'How many unique users are following this collection',
  })
  followCount!: number;

  @ApiProperty({ description: 'How many NFTs are part of this collection' })
  nftCount!: number;

  @ApiProperty({
    required: false,
    description: 'How many holders does this collection has',
  })
  holdersCount?: number;

  constructor(props?: Partial<StatisticsOtherDto>) {
    Object.assign(this, props);
  }
}

export class StatisticsDto {
  @ApiProperty({
    type: StatisticsOtherDto,
    description: 'More statistics about the collection',
  })
  other!: StatisticsOtherDto;

  @ApiProperty({
    type: StatisticsTradeDataDto,
    description:
      'Trading statistics for the collection including volume and price data',
  })
  tradeData!: StatisticsTradeDataDto;

  @ApiProperty({ type: StatisticsMintDataDto, required: false })
  mintData?: StatisticsMintDataDto;

  constructor(props?: Partial<StatisticsDto>) {
    Object.assign(this, props);
  }
}
