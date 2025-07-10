import { ApiProperty } from '@nestjs/swagger';
import { CollectionInfoDto } from '../../requests/collection/collection-info.dto';

export class StakingExploreDto {
  @ApiProperty()
  collection!: string;

  @ApiProperty()
  activePools!: number;

  @ApiProperty()
  totalPoolStakedCount!: number;

  @ApiProperty()
  totalDelegatorCount!: number;

  @ApiProperty({ type: String, isArray: true })
  rewardTickers!: string[];
}

export class StakingExploreDtoHydrated extends StakingExploreDto {
  @ApiProperty({ type: () => CollectionInfoDto })
  collectionInfo!: CollectionInfoDto;
}
