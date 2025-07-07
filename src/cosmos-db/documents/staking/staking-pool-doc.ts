import { StakingIssuingTypeString } from './staking-issuing-type-string.enum';
import { StakingPoolTypeString } from './staking-pool-type-string.enum';
import { StakingDataType } from './staking-data-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { NftProps } from '../token/nft-details.doc';

export class StakingPoolDoc {
  dataType: StakingDataType = StakingDataType.Pool;
  poolId!: number;
  poolType!: StakingPoolTypeString;
  stakingEnabled!: boolean;
  whitelistEnabled!: boolean;
  matchPairEnabled!: boolean;
  maxStakePerWallet!: number;
  maxStakePerPool!: number;
  issuingType!: StakingIssuingTypeString;
  issuingDeadline!: number;
  issuingStart!: number;
  unboundPeriod!: number;
  collection!: string[];
  reward!: XoxnoStakingReward[];
  cutFee!: number;
  owner!: string;
  name?: string;
  profile?: string;
  totalWhitelisted?: number;
  delegatorCount?: number = 0;
  poolStakedCount?: number = 0;
  pk?: string;
  id?: string;

  constructor(props?: Partial<StakingPoolDoc>) {
    Object.assign(this, props);
    this.id = this.poolId.toString();
    this.pk = this.poolId.toString();
  }
}

export class XoxnoStakingReward {
  constructor(init?: Partial<XoxnoStakingReward>) {
    Object.assign(this, init);
  }

  @ApiProperty({ description: 'Token identifier', example: 'RARE-99e8b0' })
  tokenIdentifier!: string;

  @ApiProperty({ description: 'Token nonce', example: 0 })
  tokenNonce!: number;

  @ApiProperty({
    description: 'Reward balance',
    example: '322605500000000000000000',
  })
  rewardBalance!: string;

  @ApiProperty({
    description: 'Share reward balance',
    example: '322605500000000000000000',
  })
  shareRewardBalance!: string;

  @ApiProperty({
    description: 'Reward per epoch',
    example: '322605500000000000000000',
  })
  rewardPerEpoch!: string;

  @ApiProperty({
    description: 'Reward per epoch short',
    example: 322605.5,
    required: false,
  })
  rewardPerEpochShort?: number;

  @ApiProperty({
    description: 'Reward per day per NFT',
    example: 1,
    required: false,
  })
  rewardPerDayPerNft?: number;

  @ApiProperty({
    description: 'Reward balance short',
    example: 322605.5,
    required: false,
  })
  rewardBalanceShort?: number;

  @ApiProperty({
    description: 'USD value',
    example: 27.64023234925034,
    required: false,
  })
  usdValue?: number;
}

export class XoxnoStakingRewardClaim {
  constructor(init?: Partial<XoxnoStakingRewardClaim>) {
    Object.assign(this, init);
  }

  tokenIdentifier!: string;
  tokenNonce!: number;
  amount!: string;
}

export class XoxnoStakingIssuingReward {
  constructor(init?: Partial<XoxnoStakingIssuingReward>) {
    Object.assign(this, init);
  }

  tokenIdentifier!: string;
  tokenNonce!: number;
  amount!: string;
  rewardBalance!: string;
  shareRewardBalance!: string;
  rewardPerEpoch!: string;
}

export class StakingSummary {
  @ApiProperty({ description: 'Pool ID', example: 3 })
  poolId!: number;

  @ApiProperty({ description: 'Pool name', example: 'SRB - MiceCity' })
  name!: string;

  @ApiProperty({
    description: 'Pool description',
    example: 'The largest staking pool',
    required: false,
  })
  description?: string;

  @ApiProperty({ description: 'Staking enabled', example: true })
  stakingEnabled!: boolean;

  @ApiProperty({
    description: 'Profile picture URL',
    example:
      'https://media.xoxno.com/stakingpools/3/stakingPoolPicture_3.webp?_ts=1716838395',
  })
  profile!: string;

  @ApiProperty({
    description: 'Collection identifiers',
    type: String,
    isArray: true,
    example: ['MICE-a0c447', 'SRB-61daf7'],
  })
  collection!: string[];

  @ApiProperty({ description: 'Pool staked count', example: 5895 })
  poolStakedCount!: number;

  @ApiProperty({ description: 'User staked count', example: 0 })
  userStakedCount!: number;

  @ApiProperty({ description: 'Delegator count', example: 267 })
  delegatorCount!: number;

  @ApiProperty({ description: 'Reward duration in days', example: 63 })
  rewardDuration!: number;

  @ApiProperty({
    description: 'Pool reward details',
    type: XoxnoStakingReward,
    isArray: true,
  })
  poolReward!: XoxnoStakingReward[];

  @ApiProperty({
    description: 'User reward details',
    type: XoxnoStakingReward,
    isArray: true,
  })
  userReward!: XoxnoStakingReward[];

  @ApiProperty({ description: 'Pool type', example: 'Duo' })
  poolType!: string;

  @ApiProperty({ description: 'Issuing type', example: 'Fixed' })
  issuingType!: string;

  @ApiProperty({ description: 'Unbound period in days', example: 0 })
  unBoundPeriod!: number;

  @ApiProperty({ description: 'Has unbound period', example: false })
  hasUnboundPeriod!: boolean;

  @ApiProperty({ description: 'Unbound count', example: 4 })
  userUnboundCount!: number;

  @ApiProperty({ description: 'Max pool limit', example: 16000 })
  maxPoolLimit!: number;

  @ApiProperty({ description: 'Has max wallet limit', example: true })
  hasMaxWalletLimit!: boolean;

  @ApiProperty({ description: 'Max wallet limit', example: 8000 })
  maxWalletLimit!: number;

  @ApiProperty({ description: 'Start epoch', example: 1381 })
  startEpoch!: number;

  @ApiProperty({ description: 'End epoch', example: 1444 })
  endEpoch!: number;

  @ApiProperty({
    description: 'Pool owner address',
    example: 'erd13sj3r6xuh708nhv6t5tqquznwcve4nhaghwdz9lac0zpmw0qe0hqysg4w6',
  })
  owner!: string;

  @ApiProperty({ description: 'Current epoch', example: 1442 })
  currentEpoch!: number;

  @ApiProperty({ description: 'Is active flag', example: true })
  isActive!: boolean;

  @ApiProperty({ description: 'Days left for staking', example: 2 })
  daysLeft!: number;

  @ApiProperty({ description: 'Cut fee percentage', example: 0 })
  cutFee!: number;

  @ApiProperty({ description: 'Percentage filled', example: 36.84375 })
  percentageFilled!: number;

  constructor(init?: Partial<StakingSummary>) {
    Object.assign(this, init);
  }
}

export class StakingUserPoolNfts {
  @ApiProperty({ type: StakingSummary })
  poolInfo!: StakingSummary;

  @ApiProperty({ type: NftProps, isArray: true })
  nftDocs: NftProps[] = [];

  @ApiProperty({ example: 12, type: Number })
  count: number = 0;
}
