import { ApiProperty } from '@nestjs/swagger';
import { ShortCollectionDoc } from '../../cosmos-db/documents/short/short-collection.doc';

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
  @ApiProperty({ type: () => ShortCollectionDoc })
  collectionInfo!: ShortCollectionDoc;
}
