import { ApiProperty } from '@nestjs/swagger';

export class RewardDto {
  @ApiProperty({ description: 'Token identifier', example: 'WXMEX-794dbd' })
  tokenIdentifier!: string;

  @ApiProperty({ description: 'Token nonce', example: 0 })
  tokenNonce!: number;

  @ApiProperty({
    description: 'Amount of reward',
    example: '140649439520333680917622',
  })
  amount!: string;

  @ApiProperty({ description: 'Short amount of reward', example: 140649.4395 })
  amountShort!: number;

  @ApiProperty({
    description: 'USD value of reward',
    example: 0.6295776701542604,
  })
  usdValue!: number;
}

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
    type: RewardDto,
    isArray: true,
    description: 'Rewards information',
  })
  reward!: RewardDto[];
}
