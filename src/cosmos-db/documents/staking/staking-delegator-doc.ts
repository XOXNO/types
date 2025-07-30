import { ApiProperty } from '@nestjs/swagger';
import { StakingDataType } from '../../../enums/staking-data-type.enum';
import { XoxnoStakingRewardClaim } from './staking-pool-doc';

export class StakingDelegatorDoc {
  @ApiProperty({
    description: 'Data type identifier for staking delegator',
    enum: StakingDataType,
    example: StakingDataType.Delegator,
    default: StakingDataType.Delegator,
  })
  dataType: StakingDataType = StakingDataType.Delegator;
  @ApiProperty({
    description: 'Wallet address of the delegator',
    example: 'erd1...',
  })
  address!: string;
  @ApiProperty({
    description: 'ID of the staking pool',
    example: 1,
  })
  poolId!: number;
  @ApiProperty({
    description: 'Epoch of the last action performed (-1 means no claim yet)',
    example: 1234,
    default: -1,
  })
  lastActionEpoch: number = -1; // -1 means no claim yet
  @ApiProperty({
    description: 'Number of items staked',
    example: 10,
  })
  stakedCount!: number;
  @ApiProperty({
    description: 'Number of items in unbounding period',
    example: 0,
    default: 0,
  })
  unboundCount: number = 0;
  @ApiProperty({
    description: 'Collection of NFT identifiers that are staked',
    type: [String],
    example: ['COLLECTION-123456-01', 'COLLECTION-123456-02'],
  })
  collection!: string[];
  @ApiProperty({
    description: 'List of claimed rewards',
    type: [XoxnoStakingRewardClaim],
    isArray: true,
  })
  claimedRewards!: XoxnoStakingRewardClaim[];
  @ApiProperty({
    description: 'Document ID in Cosmos DB',
    example: 'erd1...-Delegator-1',
    required: false,
  })
  id?: string;
  @ApiProperty({
    description: 'Partition key for Cosmos DB',
    example: 'erd1...',
    required: false,
  })
  pk?: string;

  constructor(props?: Partial<StakingDelegatorDoc>) {
    Object.assign(this, props);
    this.id = `${this.address}-${this.dataType}-${this.poolId}`;
    this.pk = `${this.address}`;
  }
}
