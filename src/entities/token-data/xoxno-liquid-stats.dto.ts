import { ApiProperty } from '@nestjs/swagger';
import { RateType } from './metrics';

export class XoxnoLiquidStatsDto {
  @ApiProperty({
    description: 'Number of protocol participants',
    example: 270,
  })
  participants!: number;

  @ApiProperty({
    description: 'Total rewards awarded',
    example: 768.42,
  })
  totalRewards!: number;

  @ApiProperty({
    description: 'Total staked amount',
    example: 785386.47,
  })
  totalStaked!: number;

  @ApiProperty({
    description: 'Yearly APR',
    example: 13.07,
  })
  yearlyAPR!: number;

  @ApiProperty({
    description: 'Yearly APY',
    example: 13.07,
    required: false,
  })
  apy?: number;

  @ApiProperty({
    description: 'Total rewards as USD value',
    example: 171.65,
  })
  totalRewardsUsdValue!: number;

  @ApiProperty({
    description: 'Total staked amount as USD value',
    example: 140274.99,
  })
  totalStakedUsdValue!: number;

  @ApiProperty({
    description: 'Exchange rate information',
    type: RateType,
  })
  rateInfo!: RateType;

  @ApiProperty({
    description: 'Service fee',
    example: 0,
  })
  serviceFee!: number;

  @ApiProperty({
    description: 'Amount available for instant unstake',
    example: 0,
  })
  instantUnstake!: string;

  @ApiProperty({
    description: 'Amount pending for unstake',
    example: 0,
  })
  instantPendingUnstake!: string;
}
