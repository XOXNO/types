import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CollectionProfileDoc } from '../../cosmos-db/documents/collection/profile';

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
  @ApiProperty({ type: () => PartialType<CollectionProfileDoc> })
  collectionInfo!: Partial<CollectionProfileDoc>;
}
