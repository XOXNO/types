import { ApiProperty } from '@nestjs/swagger';

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

  constructor(props?: Partial<StatisticsDto>) {
    Object.assign(this, props);
  }
}

export type CollectionStatistics = StatisticsDto;
