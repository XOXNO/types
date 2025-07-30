import { ApiProperty } from '@nestjs/swagger';
import { ShortCollectionDoc } from '../../cosmos-db/documents/short/short-collection.doc';

export class StakingExploreDto {
  @ApiProperty({
    description: 'Collection identifier',
    example: 'MICE-a0c447',
    type: String,
  })
  collection!: string;

  @ApiProperty({
    description: 'Number of active staking pools for this collection',
    example: 3,
    type: Number,
  })
  activePools!: number;

  @ApiProperty({
    description: 'Total number of NFTs staked across all pools',
    example: 5895,
    type: Number,
  })
  totalPoolStakedCount!: number;

  @ApiProperty({
    description: 'Total number of delegators participating in staking',
    example: 267,
    type: Number,
  })
  totalDelegatorCount!: number;

  @ApiProperty({
    description: 'List of reward token tickers available in staking pools',
    example: ['RARE-99e8b0', 'USDC-350c4e'],
    type: String,
    isArray: true,
  })
  rewardTickers!: string[];
}

export class StakingExploreDtoHydrated extends StakingExploreDto {
  @ApiProperty({ type: () => ShortCollectionDoc })
  collectionInfo!: ShortCollectionDoc;
}
