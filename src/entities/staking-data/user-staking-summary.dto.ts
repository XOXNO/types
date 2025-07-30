import { ApiProperty } from '@nestjs/swagger';
import { XoxnoStakingReward } from '../../cosmos-db/documents/staking/staking-pool-doc';

export class UserStakingSummaryDto {
  @ApiProperty({ description: 'Collection identifier', example: 'MICE-a0c447' })
  collection!: string;

  @ApiProperty({ description: 'Number of staked items', example: 21 })
  stakedCount!: number;

  @ApiProperty({ description: 'Name of the collection', example: 'MiceCity' })
  name!: string;

  @ApiProperty({ description: 'Verification status', example: true })
  isVerified!: boolean;

  @ApiProperty({
    description: 'Profile image URL',
    example:
      'https://media.xoxno.com/collectionprofile/MICE-a0c447/profilePicture.webp?ts=1679309756',
  })
  profile!: string;

  @ApiProperty({
    description: 'Banner image URL',
    example:
      'https://media.xoxno.com/collectionprofile/MICE-a0c447/profilebanner.webp',
  })
  banner!: string;

  @ApiProperty({
    description: 'List of pool IDs where the user has staked NFTs',
    example: [1, 3, 7],
    type: Number,
    isArray: true,
  })
  poolIds!: number[];

  @ApiProperty({
    description: 'User reward details across all pools',
    type: () => XoxnoStakingReward,
    isArray: true,
  })
  userReward!: XoxnoStakingReward[];
}
