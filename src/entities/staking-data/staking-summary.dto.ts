// file: dtos/staking-summary.dto.ts
import { PickType } from '@nestjs/swagger';
import { StakingSummary } from '../../cosmos-db/documents/staking/staking-pool-doc';

// class Reward {
//   @ApiProperty({ description: 'Token identifier', example: 'RARE-99e8b0' })
//   tokenIdentifier!: string;

//   @ApiProperty({ description: 'Token nonce', example: 0 })
//   tokenNonce!: number;

//   @ApiProperty({
//     description: 'Reward balance',
//     example: '322605500000000000000000',
//   })
//   rewardBalance!: string;

//   @ApiProperty({ description: 'Short reward balance', example: 322605.5 })
//   rewardBalanceShort!: number;

//   @ApiProperty({ description: 'Reward per epoch short', example: 8000 })
//   rewardPerEpochShort!: number;

//   @ApiProperty({ description: 'Reward per day per NFT', example: 1 })
//   rewardPerDayPerNft!: number;

//   @ApiProperty({ description: 'USD value', example: 27.64023234925034 })
//   usdValue!: number;
// }

// export class StakingSummary {
//   @ApiProperty({ description: 'Pool ID', example: 3 })
//   poolId: number;

//   @ApiProperty({ description: 'Pool name', example: 'SRB - MiceCity' })
//   name: string;

//   @ApiProperty({
//     description: 'Pool description',
//     example: 'The largest staking pool',
//   })
//   description?: string;

//   @ApiProperty({ description: 'Staking enabled', example: true })
//   stakingEnabled: boolean;

//   @ApiProperty({
//     description: 'Profile picture URL',
//     example:
//       'https://media.xoxno.com/stakingpools/3/stakingPoolPicture_3.webp?_ts=1716838395',
//   })
//   profile: string;

//   @ApiProperty({
//     description: 'Collection identifiers',
//     type: String,
//     isArray: true,
//     example: ['MICE-a0c447', 'SRB-61daf7'],
//   })
//   collection: string[];

//   @ApiProperty({ description: 'Pool staked count', example: 5895 })
//   poolStakedCount: number;

//   @ApiProperty({ description: 'User staked count', example: 0 })
//   userStakedCount: number;

//   @ApiProperty({ description: 'Delegator count', example: 267 })
//   delegatorCount: number;

//   @ApiProperty({ description: 'Reward duration in days', example: 63 })
//   rewardDuration: number;

//   @ApiProperty({
//     description: 'Pool reward details',
//     type: Reward,
//     isArray: true,
//   })
//   poolReward: Reward[];

//   @ApiProperty({
//     description: 'User reward details',
//     type: Reward,
//     isArray: true,
//   })
//   userReward: Reward[];

//   @ApiProperty({ description: 'Pool type', example: 'Duo' })
//   poolType: string;

//   @ApiProperty({ description: 'Issuing type', example: 'Fixed' })
//   issuingType: string;

//   @ApiProperty({ description: 'Unbound period in days', example: 0 })
//   unBoundPeriod: number;

//   @ApiProperty({ description: 'Has unbound period', example: false })
//   hasUnboundPeriod: boolean;

//   @ApiProperty({ description: 'Max pool limit', example: 16000 })
//   maxPoolLimit: number;

//   @ApiProperty({ description: 'Has max wallet limit', example: true })
//   hasMaxWalletLimit: boolean;

//   @ApiProperty({ description: 'Max wallet limit', example: 8000 })
//   maxWalletLimit: number;

//   @ApiProperty({ description: 'Start epoch', example: 1381 })
//   startEpoch: number;

//   @ApiProperty({ description: 'End epoch', example: 1444 })
//   endEpoch: number;

//   @ApiProperty({
//     description: 'Pool owner address',
//     example: 'erd13sj3r6xuh708nhv6t5tqquznwcve4nhaghwdz9lac0zpmw0qe0hqysg4w6',
//   })
//   owner: string;

//   @ApiProperty({ description: 'Current epoch', example: 1442 })
//   currentEpoch: number;

//   @ApiProperty({ description: 'Is active flag', example: true })
//   isActive: boolean;

//   @ApiProperty({ description: 'Days left for staking', example: 2 })
//   daysLeft: number;

//   @ApiProperty({ description: 'Cut fee percentage', example: 0 })
//   cutFee: number;

//   @ApiProperty({ description: 'Percentage filled', example: 36.84375 })
//   percentageFilled: number;
// }

export class StakingPostDTO extends PickType(StakingSummary, [
  'name',
  'description',
] as never) {}
