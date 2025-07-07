// DTO Type
import { ApiProperty } from '@nestjs/swagger';

import { CollectionStatsDto } from './collection-stats';

export class ExploreCollectionsStatisticsDto {
  @ApiProperty({ type: CollectionStatsDto, isArray: true })
  resources!: CollectionStatsDto[];

  @ApiProperty({ example: true })
  hasMoreResults!: boolean;
}
