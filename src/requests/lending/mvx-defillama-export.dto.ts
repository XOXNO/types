import { ApiProperty } from '@nestjs/swagger';

/**
 * MultiversX lending exports for DefiLlama, mirroring the Stellar contract in
 * `defillama-lending-export.dto.ts` field-for-field so a single
 * chain-parameterised adapter can read both chains.
 *
 * MVX is a flat market model: there is no hub/spoke split, so risk parameters
 * (ltv, liquidationThreshold) live directly on each market rather than on a
 * separate spokeMarkets array. `hubMarkets` / `spokeMarkets` are therefore
 * absent here by design, not omitted by accident.
 */
export class MvxDefillamaMarketExport {
  @ApiProperty() chain!: string;

  @ApiProperty() project!: string;

  @ApiProperty({
    description:
      'Stable pool id. MVX is a flat market model, so the token identifier is already unique per market (Stellar needs `${hubId}-${token}`).',
  })
  poolId!: string;

  @ApiProperty() url!: string;

  @ApiProperty() symbol!: string;

  @ApiProperty({
    description: 'ESDT identifier, or EGLD for the native token.',
  })
  token!: string;

  @ApiProperty({ description: 'Liquidity-layer contract for this market.' })
  marketAddress!: string;

  @ApiProperty() decimals!: number;

  @ApiProperty() marketStatus!: string;

  @ApiProperty() reserveFactorBps!: number;

  @ApiProperty({ description: 'Legacy alias of tvlCashRaw (pool cash).' })
  tvlRaw!: string;

  @ApiProperty({ description: 'Pool cash = supplied - borrowed, base units.' })
  tvlCashRaw!: string;

  @ApiProperty() tvlSuppliedRaw!: string;

  @ApiProperty() suppliedRaw!: string;

  @ApiProperty() borrowedRaw!: string;

  @ApiProperty({ description: 'Legacy alias of tvlCashUsd.' })
  tvlUsd!: number;

  @ApiProperty() tvlCashUsd!: number;

  @ApiProperty() tvlSuppliedUsd!: number;

  @ApiProperty() suppliedUsd!: number;

  @ApiProperty() borrowedUsd!: number;

  @ApiProperty({ description: 'Decimal fraction in [0,1]; 0.05 = 5% APY.' })
  supplyApy!: number;

  @ApiProperty({ description: 'Decimal fraction in [0,1].' })
  borrowApy!: number;

  @ApiProperty({ description: 'Decimal fraction in [0,1].' })
  utilizationRate!: number;

  @ApiProperty() usdPrice!: number;

  @ApiProperty({ description: 'Decimal fraction in [0,1].' })
  ltv!: number;

  @ApiProperty({ description: 'Decimal fraction in [0,1].' })
  liquidationThreshold!: number;

  @ApiProperty() collateral!: boolean;

  @ApiProperty() borrowable!: boolean;
}

export class MvxDefillamaSummary {
  @ApiProperty() marketCount!: number;

  @ApiProperty() tvlUsd!: number;

  @ApiProperty() tvlCashUsd!: number;

  @ApiProperty() tvlSuppliedUsd!: number;

  @ApiProperty() suppliedUsd!: number;

  @ApiProperty() borrowedUsd!: number;
}

export class MvxDefillamaExport {
  @ApiProperty() project!: string;

  @ApiProperty() chain!: string;

  @ApiProperty() generatedAt!: string;

  @ApiProperty({ type: [MvxDefillamaMarketExport] })
  markets!: MvxDefillamaMarketExport[];

  @ApiProperty() summary!: MvxDefillamaSummary;

  @ApiProperty({ type: Object }) methodology!: Record<string, string>;
}

export class MvxRevenuePoint {
  @ApiProperty() chain!: string;

  @ApiProperty() project!: string;

  @ApiProperty() timestamp!: string;

  @ApiProperty({
    description:
      'Total value extracted: supplier interest + all protocol fee streams.',
  })
  dailyFeesUsd!: number;

  @ApiProperty({ description: 'Protocol take across every stream.' })
  dailyRevenueUsd!: number;

  @ApiProperty({
    description:
      'Same as dailyRevenueUsd; MVX routes all revenue to the treasury accumulator.',
  })
  dailyProtocolRevenueUsd!: number;

  @ApiProperty({ description: 'Interest paid out to suppliers.' })
  dailySupplySideRevenueUsd!: number;

  @ApiProperty({ description: 'Gross borrow interest, for cross-checking.' })
  dailyBorrowInterestUsd!: number;

  @ApiProperty({
    description:
      'dailyFeesUsd - dailyBorrowInterestUsd: flash-loan, strategy and liquidation fees, which are minted straight into revenue and never touch borrow_index.',
  })
  dailyNonInterestFeesUsd!: number;

  @ApiProperty() tvlUsd!: number;

  @ApiProperty() borrowedUsd!: number;
}

export class MvxRevenueExport {
  @ApiProperty() project!: string;

  @ApiProperty() chain!: string;

  @ApiProperty() generatedAt!: string;

  @ApiProperty() startTime!: string;

  @ApiProperty() endTime!: string;

  @ApiProperty({ type: [MvxRevenuePoint] }) points!: MvxRevenuePoint[];

  @ApiProperty({ type: Object }) methodology!: Record<string, string>;
}

export class MvxLiquidationsPoint {
  @ApiProperty() timestamp!: string;

  @ApiProperty({
    description:
      'GROSS seized collateral, before the protocol cut of the bonus. This is the DeFiLlama dailyCollateralLiquidated dimension. Named to match the Stellar export.',
  })
  seizedUsd!: number;

  @ApiProperty({
    description:
      'Debt repaid by liquidators. Never sum with seizedUsd: the two legs describe the same liquidation from opposite sides.',
  })
  repaidUsd!: number;

  @ApiProperty({
    description:
      'CAUTION: base units summed across different tokens, so not interpretable on its own. Kept for parity with the Stellar export; use the USD fields.',
  })
  seizedNative!: number;

  @ApiProperty({
    description: 'See seizedNative: not interpretable on its own.',
  })
  repaidNative!: number;

  @ApiProperty({ description: 'Distinct liquidation transactions, not legs.' })
  liquidations!: number;

  @ApiProperty() accountsLiquidated!: number;
}

export class MvxLiquidationsExport {
  @ApiProperty() project!: string;

  @ApiProperty() chain!: string;

  @ApiProperty() generatedAt!: string;

  @ApiProperty({ type: [MvxLiquidationsPoint] })
  points!: MvxLiquidationsPoint[];
}

/**
 * Flat window totals, mirroring StellarLendingUserStatsExport. Deliberately not
 * a series: dcount cannot be summed across bins without double-counting an
 * owner who was active on more than one day.
 */
export class MvxUserStatsExport {
  @ApiProperty() project!: string;

  @ApiProperty() chain!: string;

  @ApiProperty() generatedAt!: string;

  @ApiProperty() startTime!: string;

  @ApiProperty() endTime!: string;

  @ApiProperty({
    description: 'Distinct owner WALLETS with position activity in the window.',
  })
  activeUsers!: number;

  @ApiProperty({
    description:
      'Owners whose first-ever position activity falls in the window, evaluated against all history.',
  })
  newUsers!: number;

  @ApiProperty({ description: 'Distinct position NFTs touched.' })
  activeAccounts!: number;

  @ApiProperty() transactions!: number;
}
