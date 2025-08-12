import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { StakingDataType } from '../../../enums/staking-data-type.enum';
import { StakingIssuingTypeString } from '../../../enums/staking-issuing-type-string.enum';
import { StakingPoolTypeString } from '../../../enums/staking-pool-type-string.enum';
import { NftDocHydrated } from '../token/nft-details.doc';

export class StakingPoolDoc {
  @ApiProperty({
    description: 'Type of staking data document',
    enum: StakingDataType,
    enumName: 'StakingDataType',
    example: StakingDataType.Pool,
  })
  dataType: StakingDataType = StakingDataType.Pool;

  @ApiProperty({
    description: 'Unique identifier for the staking pool',
    example: 3,
    type: 'integer',
  })
  poolId!: number;

  @ApiProperty({
    description: 'Type of staking pool',
    enum: StakingPoolTypeString,
    enumName: 'StakingPoolTypeString',
    example: 'Duo',
  })
  poolType!: StakingPoolTypeString;

  @ApiProperty({
    description: 'Whether staking is currently enabled for this pool',
    example: true,
    type: Boolean,
  })
  stakingEnabled!: boolean;

  @ApiProperty({
    description: 'Whether whitelist is enabled for this pool',
    example: false,
    type: Boolean,
  })
  whitelistEnabled!: boolean;

  @ApiProperty({
    description: 'Whether match pair staking is enabled',
    example: false,
    type: Boolean,
  })
  matchPairEnabled!: boolean;

  @ApiProperty({
    description: 'Maximum number of NFTs a wallet can stake',
    example: 8000,
    type: 'integer',
    minimum: 0,
  })
  maxStakePerWallet!: number;

  @ApiProperty({
    description: 'Maximum total number of NFTs that can be staked in the pool',
    example: 16000,
    type: 'integer',
    minimum: 0,
  })
  maxStakePerPool!: number;

  @ApiProperty({
    description: 'Type of reward issuing mechanism',
    enum: StakingIssuingTypeString,
    enumName: 'StakingIssuingTypeString',
    example: 'Fixed',
  })
  issuingType!: StakingIssuingTypeString;

  @ApiProperty({
    description: 'Epoch deadline for reward issuing',
    example: 1444,
    type: 'integer',
  })
  issuingDeadline!: number;

  @ApiProperty({
    description: 'Epoch when reward issuing starts',
    example: 1381,
    type: 'integer',
  })
  issuingStart!: number;

  @ApiProperty({
    description: 'Number of days for the unbounding period',
    example: 0,
    type: 'integer',
    minimum: 0,
  })
  unboundPeriod!: number;

  @ApiProperty({
    description: 'List of collection identifiers eligible for staking',
    example: ['MICE-a0c447', 'SRB-61daf7'],
    type: String,
    isArray: true,
  })
  collection!: string[];

  @ApiProperty({
    description: 'List of reward configurations for the pool',
    type: () => XoxnoStakingReward,
    isArray: true,
  })
  reward!: XoxnoStakingReward[];

  @ApiProperty({
    description: 'Fee percentage cut taken by the pool owner',
    example: 5,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  cutFee!: number;

  @ApiProperty({
    description: 'Wallet address of the pool owner',
    example: 'erd13sj3r6xuh708nhv6t5tqquznwcve4nhaghwdz9lac0zpmw0qe0hqysg4w6',
    type: String,
  })
  owner!: string;

  @ApiProperty({
    description: 'Name of the staking pool',
    example: 'SRB - MiceCity',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Profile picture URL for the staking pool',
    example:
      'https://media.xoxno.com/stakingpools/3/stakingPoolPicture_3.webp?_ts=1716838395',
    type: String,
    required: false,
  })
  profile?: string;

  @ApiProperty({
    description: 'Total number of whitelisted addresses',
    example: 100,
    type: 'integer',
    required: false,
  })
  totalWhitelisted?: number;

  @ApiProperty({
    description: 'Number of delegators in the pool',
    example: 267,
    type: 'integer',
    required: false,
  })
  delegatorCount?: number = 0;

  @ApiProperty({
    description: 'Total number of NFTs staked in the pool',
    example: 5895,
    type: 'integer',
    required: false,
  })
  poolStakedCount?: number = 0;

  @ApiProperty({
    description: 'Partition key for Cosmos DB storage',
    example: '3',
    type: String,
    required: false,
  })
  pk?: string;

  @ApiProperty({
    description: 'Document ID in Cosmos DB',
    example: '3',
    type: String,
    required: false,
  })
  id?: string;

  constructor(props?: Partial<StakingPoolDoc>) {
    Object.assign(this, props);
    this.id = this.poolId.toString();
    this.pk = this.poolId.toString();
  }
}

export class XoxnoStakingReward {
  constructor(props?: Partial<XoxnoStakingReward>) {
    Object.assign(this, props);
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
  constructor(props?: Partial<XoxnoStakingRewardClaim>) {
    Object.assign(this, props);
  }

  @ApiProperty({
    description: 'Token identifier for the reward claim',
    example: 'RARE-99e8b0',
    type: String,
  })
  tokenIdentifier!: string;

  @ApiProperty({
    description: 'Token nonce for the reward claim',
    example: 0,
    type: Number,
  })
  tokenNonce!: number;

  @ApiProperty({
    description: 'Amount of tokens to claim',
    example: '1000000000000000000',
    type: String,
  })
  amount!: string;
}

export class XoxnoStakingIssuingReward {
  constructor(props?: Partial<XoxnoStakingIssuingReward>) {
    Object.assign(this, props);
  }

  @ApiProperty({
    description: 'Token identifier for issuing reward',
    example: 'RARE-99e8b0',
    type: String,
  })
  tokenIdentifier!: string;

  @ApiProperty({
    description: 'Token nonce for issuing reward',
    example: 0,
    type: Number,
  })
  tokenNonce!: number;

  @ApiProperty({
    description: 'Amount of tokens to issue',
    example: '1000000000000000000',
    type: String,
  })
  amount!: string;

  @ApiProperty({
    description: 'Total reward balance available',
    example: '322605500000000000000000',
    type: String,
  })
  rewardBalance!: string;

  @ApiProperty({
    description: 'Share reward balance for distribution',
    example: '322605500000000000000000',
    type: String,
  })
  shareRewardBalance!: string;

  @ApiProperty({
    description: 'Reward amount distributed per epoch',
    example: '5000000000000000000000',
    type: String,
  })
  rewardPerEpoch!: string;
}

export class StakingSummary {
  @ApiProperty({ description: 'Pool ID', example: 3 })
  poolId!: number;

  @ApiProperty({ description: 'Pool name', example: 'SRB - MiceCity' })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Pool description',
    example: 'The largest staking pool',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Staking enabled', example: true })
  stakingEnabled!: boolean;

  @ApiProperty({
    description: 'Profile picture URL',
    example:
      'https://media.xoxno.com/stakingpools/3/stakingPoolPicture_3.webp?_ts=1716838395',
  })
  profile: string = 'https://media.xoxno.com/utils/defaultProfilePic.webp';

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

  constructor(props?: Partial<StakingSummary>) {
    Object.assign(this, props);
  }
}

export class StakingUserPoolNfts {
  @ApiProperty({ type: StakingSummary })
  poolInfo!: StakingSummary;

  @ApiProperty({ type: NftDocHydrated, isArray: true })
  nftDocs: NftDocHydrated[] = [];

  @ApiProperty({ example: 12, type: 'integer' })
  count: number = 0;
}
