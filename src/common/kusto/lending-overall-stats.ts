import { ApiProperty } from '@nestjs/swagger';

export class LendingOverallStats {
  @ApiProperty({
    description: 'Top markets by supply APY',
    example: ['USDC-350c4e', 'XOXNO-589e09', 'LXOXNO-a00540'],
  })
  topMarkets!: string[];
  @ApiProperty({
    description: 'Total number of lending markets',
    example: 10,
  })
  marketCount!: number;
  @ApiProperty({
    description: 'Total supplied amount',
    example: 10000000,
  })
  @ApiProperty({
    description: 'Total number of participants',
    example: 100,
  })
  participantsCount!: number;

  @ApiProperty({
    description: 'Maximum APY',
    example: 0.04,
  })
  bestApy!: number;

  supplied!: number;
  @ApiProperty({
    description: 'Total borrowed amount',
    example: 5000000,
  })
  borrowed!: number;
  @ApiProperty({
    description: 'Total supplied margin over 24h',
    example: 30,
  })
  suppliedMargin!: number;
  @ApiProperty({
    description: 'Total borrowed margin over 24h',
    example: 15,
  })
  borrowedMargin!: number;

  constructor(props?: Partial<LendingOverallStats>) {
    Object.assign(this, props);
  }
}
