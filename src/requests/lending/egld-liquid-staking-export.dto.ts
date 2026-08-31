import { ApiProperty } from '@nestjs/swagger';

/**
 * DefiLlama fee export for XOXNO EGLD liquid staking, mirroring the lending
 * exports so one adapter shape reads both products.
 *
 * Unlike lending, nothing here is derived: the staking contract emits the
 * protocol's cut as its own `protocolRevenue` event alongside `claimRewards`,
 * so no fee rate is assumed anywhere in the pipeline.
 */
export class EgldLiquidStakingRevenuePoint {
  @ApiProperty() chain!: string;

  @ApiProperty() project!: string;

  @ApiProperty() timestamp!: string;

  @ApiProperty({
    description:
      'Gross staking rewards accruing to the pool, before the protocol cut.',
  })
  dailyFeesUsd!: number;

  @ApiProperty({ description: "The protocol's cut, as emitted on chain." })
  dailyRevenueUsd!: number;

  @ApiProperty({
    description: 'Same as dailyRevenueUsd; all of it goes to the treasury.',
  })
  dailyProtocolRevenueUsd!: number;

  @ApiProperty({
    description:
      'Rewards kept by xEGLD holders, realised through the exchange rate.',
  })
  dailySupplySideRevenueUsd!: number;

  @ApiProperty({ description: 'Gross rewards in EGLD.' })
  dailyFeesEgld!: number;

  @ApiProperty({ description: 'Protocol cut in EGLD.' })
  dailyRevenueEgld!: number;
}

export class EgldLiquidStakingRevenueExport {
  @ApiProperty() project!: string;

  @ApiProperty() chain!: string;

  @ApiProperty() generatedAt!: string;

  @ApiProperty() startTime!: string;

  @ApiProperty() endTime!: string;

  @ApiProperty({ type: [EgldLiquidStakingRevenuePoint] })
  points!: EgldLiquidStakingRevenuePoint[];

  @ApiProperty({ type: Object }) methodology!: Record<string, string>;
}
