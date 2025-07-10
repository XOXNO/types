import { ApiProperty } from '@nestjs/swagger';

export class StatisticsTradeDataDto {
  @ApiProperty({ example: 0 })
  dayEgldVolume!: number;

  @ApiProperty({ example: 116.67 })
  weekEgldVolume!: number;

  @ApiProperty({ example: 128123.25 })
  totalEgldVolume!: number;

  averageEgldPrice!: number;
  athEgldPrice!: number;
  athTxHash!: string;
  totalTrades!: number;
}

export class StatisticsMintDataDto {
  totalMintEgldVolume!: number;
  weekMintEgldVolume!: number;
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

  @ApiProperty({ type: StatisticsTradeDataDto })
  tradeData!: StatisticsTradeDataDto;

  @ApiProperty({ type: StatisticsMintDataDto, required: false })
  mintData?: StatisticsMintDataDto;

  constructor(props?: Partial<StatisticsDto>) {
    Object.assign(this, props);
  }
}
