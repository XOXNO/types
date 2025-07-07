import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

import { CollectionInfoDto } from './collection-info.dto';

class DayTradingStatsDto {
  @ApiProperty({ description: 'Trading volume for the day' })
  @IsNumber()
  volume!: number;

  @ApiProperty({ description: 'Margin of volume change for the day' })
  @IsNumber()
  volumeMargin!: number;

  @ApiProperty({ description: 'Number of trades for the day' })
  @IsNumber()
  trades!: number;

  @ApiProperty({ description: 'Margin of trades change for the day' })
  @IsNumber()
  tradesMargin!: number;

  @ApiProperty({ description: 'Minimum price for the day' })
  @IsNumber()
  minPrice!: number;

  @ApiProperty({ description: 'Maximum price for the day' })
  @IsNumber()
  maxPrice!: number;

  @ApiProperty({ description: 'Average price for the day' })
  @IsNumber()
  averagePrice!: number;
}

class TradingStatsDto {
  @ApiProperty({
    type: DayTradingStatsDto,
    description: 'Daily trading statistics',
  })
  @ValidateNested()
  @Type(() => DayTradingStatsDto)
  day!: DayTradingStatsDto;
}

export class CollectionStatsDto {
  @ApiProperty({ description: 'Identifier of the collection' })
  @IsString()
  collection!: string;

  @ApiProperty({
    type: TradingStatsDto,
    description: 'Trading statistics of the collection',
  })
  @ValidateNested()
  @Type(() => TradingStatsDto)
  tradingStats!: TradingStatsDto;

  @ApiProperty({ description: 'Current floor price' })
  @IsNumber()
  floorPrice!: number;

  @ApiProperty({ description: 'Number of listed items' })
  @IsNumber()
  listedCount!: number;

  @ApiProperty({
    type: () => CollectionInfoDto,
    description: 'Information about the collection',
  })
  collectionInfo!: CollectionInfoDto;
}
