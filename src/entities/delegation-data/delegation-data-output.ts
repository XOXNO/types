import { ApiProperty } from '@nestjs/swagger';

export class UndelegateInfo {
  @ApiProperty({
    description: 'Unique identifier for the undelegation operation',
    example: 'undelegate-123456',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: 'Amount being undelegated in smallest denomination',
    example: '1000000000000000000',
    type: String,
  })
  value!: string;

  @ApiProperty({
    description: 'Unix timestamp when the undelegation was initiated',
    example: 1704067200,
    type: Number,
  })
  timestamp!: number;

  @ApiProperty({
    description: 'Undelegated amount as a number (may lose precision)',
    example: 1.5,
    type: Number,
  })
  valueShort!: number;
}

export class DelegationDataOutput {
  @ApiProperty({
    description: 'Delegator wallet address',
    example: 'erd1qqqqqqqqqqqqqpgq5za2j0xkucera8epyusgvm7xvvpgksdm3y4sk3me3j',
    type: String,
  })
  address!: string;

  @ApiProperty({
    description: 'Delegation contract address',
    example: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l',
    type: String,
  })
  contract!: string;

  @ApiProperty({
    description: 'Current active stake amount in smallest denomination',
    example: '10000000000000000000',
    type: String,
  })
  activeStake!: string;

  @ApiProperty({
    description: 'Active stake amount as a number (may lose precision)',
    example: 10.5,
    type: Number,
  })
  activeStakeShort!: number;

  @ApiProperty({
    description: 'List of pending undelegation operations',
    type: [UndelegateInfo],
    isArray: true,
  })
  unDelegateInfo!: UndelegateInfo[];

  @ApiProperty({
    description: 'Amount of rewards available to claim',
    example: 0.125,
    type: Number,
  })
  claimableRewards!: number;

  @ApiProperty({
    description: 'Claimable rewards as a simplified number',
    example: 0.125,
    type: Number,
  })
  claimableRewardsShort!: number;

  @ApiProperty({
    description: 'Total amount eligible for unbonding in smallest denomination',
    example: '5000000000000000000',
    type: String,
  })
  totalUnbondEligible!: string;
}
