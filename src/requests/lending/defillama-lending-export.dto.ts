import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ActivityChain } from '../../enums/common.enum';

/**
 * Per-token (aggregated) market row for DeFiLlama / Dune integrations.
 *
 * TVL semantics (P2): two documented measures coexist —
 * - `tvlCash*` / legacy `tvl*` = available pool cash (`hubAsset.cash`) × price
 * - `tvlSupplied*` (= `supplied*`) = total supplied × price (Kusto/stats TVL)
 *
 * APY / utilization (P15): decimal fractions in [0, 1] (e.g. 0.05 = 5%).
 */
export class DefillamaLendingMarketExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty({ example: 'xoxno-lending' })
  project!: string;

  @ApiProperty({ example: 'USDC' })
  symbol!: string;

  @ApiProperty({ description: 'Stellar market token contract id' })
  token!: string;

  @ApiProperty({ description: 'Market / hub-asset contract address' })
  marketAddress!: string;

  @ApiProperty({ example: 7 })
  decimals!: number;

  @ApiPropertyOptional({ description: 'Market status when known' })
  marketStatus?: string;

  @ApiProperty({ example: 1000 })
  reserveFactorBps!: number;

  @ApiProperty({
    description: 'Legacy alias of `tvlCashRaw` (available pool cash, base units)',
  })
  tvlRaw!: string;

  @ApiProperty({
    description: 'Available pool cash (`hubAsset.cash`), base units',
  })
  tvlCashRaw!: string;

  @ApiProperty({
    description: 'Total supplied balance, base units. Same as `suppliedRaw`',
  })
  tvlSuppliedRaw!: string;

  @ApiProperty()
  suppliedRaw!: string;

  @ApiProperty()
  borrowedRaw!: string;

  @ApiProperty({
    description: 'Legacy alias of `tvlCashUsd`',
    example: 1_000_000,
  })
  tvlUsd!: number;

  @ApiProperty({
    description: 'Available pool cash × oracle USD price',
    example: 1_000_000,
  })
  tvlCashUsd!: number;

  @ApiProperty({
    description:
      'Total supplied × oracle USD price. Same as `suppliedUsd` / Kusto TVL',
    example: 1_250_000,
  })
  tvlSuppliedUsd!: number;

  @ApiProperty()
  suppliedUsd!: number;

  @ApiProperty()
  borrowedUsd!: number;

  @ApiProperty({
    description: 'Decimal fraction in [0, 1], not percent',
    example: 0.05,
  })
  supplyApy!: number;

  @ApiProperty({
    description: 'Decimal fraction in [0, 1], not percent',
    example: 0.08,
  })
  borrowApy!: number;

  @ApiProperty({
    description: 'Decimal fraction in [0, 1], not percent',
    example: 0.72,
  })
  utilizationRate!: number;

  @ApiProperty()
  usdPrice!: number;

  @ApiProperty()
  cumulativeProtocolRevenueRaw!: string;

  @ApiProperty()
  cumulativeProtocolRevenueUsd!: number;

  @ApiProperty({
    description:
      'Distinct participants for this token across hubs (per-market count)',
  })
  participantsCount!: number;
}

/**
 * Per-(hub, asset) market row. Same fields as the aggregated per-token row
 * plus `hubId` / `poolId` so DeFiLlama can emit one pool per (hub, asset).
 */
export class DefillamaLendingHubMarketExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  project!: string;

  @ApiProperty()
  hubId!: number;

  @ApiPropertyOptional({ nullable: true, type: String })
  hubName!: string | null;

  @ApiProperty({ description: 'Stable DeFiLlama pool id for (hub, asset)' })
  poolId!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  marketAddress!: string;

  @ApiProperty()
  decimals!: number;

  @ApiPropertyOptional()
  marketStatus?: string;

  @ApiProperty()
  reserveFactorBps!: number;

  @ApiProperty({ description: 'Legacy alias of `tvlCashRaw`' })
  tvlRaw!: string;

  @ApiProperty()
  tvlCashRaw!: string;

  @ApiProperty()
  tvlSuppliedRaw!: string;

  @ApiProperty()
  suppliedRaw!: string;

  @ApiProperty()
  borrowedRaw!: string;

  @ApiProperty({ description: 'Legacy alias of `tvlCashUsd`' })
  tvlUsd!: number;

  @ApiProperty()
  tvlCashUsd!: number;

  @ApiProperty()
  tvlSuppliedUsd!: number;

  @ApiProperty()
  suppliedUsd!: number;

  @ApiProperty()
  borrowedUsd!: number;

  @ApiProperty({ description: 'Decimal fraction in [0, 1], not percent' })
  supplyApy!: number;

  @ApiProperty({ description: 'Decimal fraction in [0, 1], not percent' })
  borrowApy!: number;

  @ApiProperty({ description: 'Decimal fraction in [0, 1], not percent' })
  utilizationRate!: number;

  @ApiProperty()
  usdPrice!: number;

  @ApiProperty()
  cumulativeProtocolRevenueRaw!: string;

  @ApiProperty()
  cumulativeProtocolRevenueUsd!: number;
}

/**
 * Per-(spoke, hub, asset) risk/borrow-routing row for DefiLlama routing pools.
 */
export class DefillamaLendingSpokeMarketExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  project!: string;

  @ApiProperty()
  spokeId!: number;

  @ApiPropertyOptional({ nullable: true, type: String })
  spokeName!: string | null;

  @ApiProperty()
  hubId!: number;

  @ApiPropertyOptional({ nullable: true, type: String })
  hubName!: string | null;

  @ApiProperty()
  poolId!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  marketAddress!: string;

  @ApiProperty()
  decimals!: number;

  @ApiProperty()
  active!: boolean;

  @ApiProperty()
  collateral!: boolean;

  @ApiProperty()
  borrowable!: boolean;

  @ApiProperty({ description: 'LTV as decimal fraction or protocol scale' })
  ltv!: number;

  @ApiProperty()
  liquidationThreshold!: number;

  @ApiProperty()
  totalBorrowRaw!: string;

  @ApiProperty()
  totalBorrowUsd!: number;

  @ApiProperty()
  availableBorrowUsd!: number;

  @ApiProperty()
  usdPrice!: number;
}

export class DefillamaLendingExportSummary {
  @ApiProperty()
  marketCount!: number;

  @ApiProperty({
    description: 'Legacy alias of `tvlCashUsd` (cash-liquidity TVL)',
  })
  tvlUsd!: number;

  @ApiProperty({
    description: 'Sum of market `tvlCashUsd` (available pool cash × price)',
  })
  tvlCashUsd!: number;

  @ApiProperty({
    description:
      'Sum of market `tvlSuppliedUsd` / `suppliedUsd` (Kusto-style TVL)',
  })
  tvlSuppliedUsd!: number;

  @ApiProperty()
  suppliedUsd!: number;

  @ApiProperty()
  borrowedUsd!: number;

  @ApiProperty()
  cumulativeProtocolRevenueUsd!: number;

  @ApiProperty({
    description:
      'Protocol-wide unique participants (same as `uniqueMarketParticipants`). Not the sum of per-token `markets[].participantsCount`.',
  })
  participantsCount!: number;

  @ApiProperty({
    description: 'Protocol-wide unique participant addresses',
  })
  uniqueMarketParticipants!: number;
}

export class DefillamaLendingExportMethodology {
  @ApiProperty({
    description: 'Legacy TVL methodology (cash liquidity)',
  })
  tvl!: string;

  @ApiProperty({ description: 'Cash-liquidity TVL methodology' })
  tvlCash!: string;

  @ApiProperty({ description: 'Supplied×price (Kusto) TVL methodology' })
  tvlSupplied!: string;

  @ApiProperty()
  supplied!: string;

  @ApiProperty()
  borrowed!: string;

  @ApiProperty({
    description: 'APY scale: decimal fractions in [0, 1]',
  })
  apy!: string;

  @ApiProperty()
  revenue!: string;

  @ApiProperty({
    description: 'Participants = protocol-wide unique addresses',
  })
  participants!: string;
}

/**
 * Canonical Stellar lending market export for `/integrations/lending/stellar`
 * (and the excluded `/defillama/lending/stellar` alias).
 */
export class DefillamaLendingExport {
  @ApiProperty()
  project!: string;

  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty({ description: 'ISO-8601 generation timestamp' })
  generatedAt!: string;

  @ApiProperty({ type: [DefillamaLendingMarketExport] })
  markets!: DefillamaLendingMarketExport[];

  @ApiProperty({ type: [DefillamaLendingHubMarketExport] })
  hubMarkets!: DefillamaLendingHubMarketExport[];

  @ApiProperty({ type: [DefillamaLendingSpokeMarketExport] })
  spokeMarkets!: DefillamaLendingSpokeMarketExport[];

  @ApiProperty({ type: DefillamaLendingExportSummary })
  summary!: DefillamaLendingExportSummary;

  @ApiProperty({ type: DefillamaLendingExportMethodology })
  methodology!: DefillamaLendingExportMethodology;
}

export class DefillamaLendingHistoryMarketExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  project!: string;

  @ApiProperty()
  token!: string;

  @ApiProperty({ description: 'TWAP supply APY as [0, 1] fraction' })
  twapSupplyApy!: number;

  @ApiProperty({ description: 'TWAP borrow APY as [0, 1] fraction' })
  twapBorrowApy!: number;

  @ApiProperty({ description: 'TWAP utilization as [0, 1] fraction' })
  twapUtilizationRate!: number;

  @ApiProperty()
  twapSupplyAmount!: number;

  @ApiProperty()
  twapBorrowAmount!: number;
}

export class DefillamaLendingHistoryPointExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  project!: string;

  @ApiProperty()
  token!: string;

  @ApiProperty({ description: 'Bin timestamp (ISO-8601)' })
  timestamp!: string;

  @ApiProperty()
  minSupplyApy!: number;

  @ApiProperty()
  maxSupplyApy!: number;

  @ApiProperty()
  avgSupplyApy!: number;

  @ApiProperty()
  minBorrowApy!: number;

  @ApiProperty()
  maxBorrowApy!: number;

  @ApiProperty()
  avgBorrowApy!: number;

  @ApiProperty()
  minUtilizationRate!: number;

  @ApiProperty()
  maxUtilizationRate!: number;

  @ApiProperty()
  avgUtilizationRate!: number;

  @ApiProperty()
  minSupplyAmount!: number;

  @ApiProperty()
  maxSupplyAmount!: number;

  @ApiProperty()
  avgSupplyAmount!: number;

  @ApiProperty()
  minBorrowAmount!: number;

  @ApiProperty()
  maxBorrowAmount!: number;

  @ApiProperty()
  avgBorrowAmount!: number;
}

export class DefillamaLendingHistoryExport {
  @ApiProperty()
  project!: string;

  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  generatedAt!: string;

  @ApiProperty()
  startTime!: string;

  @ApiProperty()
  endTime!: string;

  @ApiProperty({ example: '1d' })
  bin!: string;

  @ApiProperty({ type: [DefillamaLendingHistoryMarketExport] })
  markets!: DefillamaLendingHistoryMarketExport[];

  @ApiProperty({ type: [DefillamaLendingHistoryPointExport] })
  points!: DefillamaLendingHistoryPointExport[];
}

export class DefillamaLendingRevenuePointExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  project!: string;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  dailyFeesUsd!: number;

  @ApiProperty()
  dailyRevenueUsd!: number;

  @ApiProperty()
  dailyProtocolRevenueUsd!: number;

  @ApiProperty()
  dailyInterestRevenueUsd!: number;

  @ApiProperty()
  dailyStrategyFeeRevenueUsd!: number;

  @ApiProperty()
  dailyFlashLoanRevenueUsd!: number;

  @ApiProperty()
  dailySupplySideRevenueUsd!: number;

  @ApiProperty()
  cumulativeProtocolRevenueUsd!: number;
}

export class DefillamaLendingRevenueMarketPointExport {
  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  project!: string;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  symbol!: string;

  @ApiProperty()
  dailyFeesNative!: number;

  @ApiProperty()
  dailyFeesUsd!: number;

  @ApiProperty()
  dailyProtocolRevenueNative!: number;

  @ApiProperty()
  dailyProtocolRevenueUsd!: number;

  @ApiProperty()
  dailyInterestRevenueNative!: number;

  @ApiProperty()
  dailyInterestRevenueUsd!: number;

  @ApiProperty()
  dailyStrategyFeeRevenueNative!: number;

  @ApiProperty()
  dailyStrategyFeeRevenueUsd!: number;

  @ApiProperty()
  dailyFlashLoanRevenueNative!: number;

  @ApiProperty()
  dailyFlashLoanRevenueUsd!: number;

  @ApiProperty()
  cumulativeProtocolRevenueNative!: number;

  @ApiProperty()
  cumulativeProtocolRevenueUsd!: number;

  @ApiProperty()
  usdPrice!: number;
}

export class DefillamaLendingRevenueMethodology {
  @ApiProperty()
  fees!: string;

  @ApiProperty()
  revenue!: string;

  @ApiProperty()
  breakdown!: string;

  @ApiProperty()
  nativeMarketValues!: string;

  @ApiProperty()
  supplySideRevenue!: string;
}

export class DefillamaLendingRevenueExport {
  @ApiProperty()
  project!: string;

  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  generatedAt!: string;

  @ApiProperty()
  startTime!: string;

  @ApiProperty()
  endTime!: string;

  @ApiProperty({ type: [DefillamaLendingRevenuePointExport] })
  points!: DefillamaLendingRevenuePointExport[];

  @ApiProperty({ type: [DefillamaLendingRevenueMarketPointExport] })
  markets!: DefillamaLendingRevenueMarketPointExport[];

  @ApiProperty({ type: DefillamaLendingRevenueMethodology })
  methodology!: DefillamaLendingRevenueMethodology;
}

/**
 * Windowed lending user stats. Users are counted by OWNER (wallet address);
 * `activeAccounts` is the sub-account count.
 */
export class StellarLendingUserStatsExport {
  @ApiProperty()
  project!: string;

  @ApiProperty({ enum: ActivityChain, enumName: 'ActivityChain' })
  chain!: ActivityChain;

  @ApiProperty()
  generatedAt!: string;

  @ApiProperty()
  startTime!: string;

  @ApiProperty()
  endTime!: string;

  @ApiProperty({ description: 'Distinct owner wallets active in the window' })
  activeUsers!: number;

  @ApiProperty({ description: 'Owners first seen in the window' })
  newUsers!: number;

  @ApiProperty({ description: 'Distinct lending sub-accounts in the window' })
  activeAccounts!: number;

  @ApiProperty()
  transactions!: number;
}
