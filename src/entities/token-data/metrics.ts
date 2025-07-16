import { ApiProperty } from '@nestjs/swagger';

export interface TokenValue {
  usdPrice: number;
  egldPrice: number;
}

export class ProtocolAprType {
  @ApiProperty()
  apr!: number;

  @ApiProperty()
  apy?: number;
}

export class RateType {
  @ApiProperty()
  rateShort!: number;

  @ApiProperty()
  rate!: string;

  @ApiProperty()
  reverseRate!: string;

  @ApiProperty()
  reverseRateShort!: number;
}

export class EsdtTokenSummary {
  @ApiProperty()
  supply!: string;

  @ApiProperty()
  minted!: string;

  @ApiProperty()
  burned!: string;

  @ApiProperty()
  initialMinted!: string;

  @ApiProperty()
  recomputedSupply!: boolean;

  @ApiProperty()
  burnedShort!: number;

  @ApiProperty()
  initialMintedShort!: number;

  @ApiProperty()
  minterShort!: number;

  @ApiProperty()
  supplyShort!: number;

  @ApiProperty()
  transfersCount!: number;

  @ApiProperty()
  holdersCount!: number;
}

export class IMetrics extends EsdtTokenSummary {
  @ApiProperty({ type: () => RateType })
  rateInfo!: RateType;

  @ApiProperty()
  apr!: number;

  @ApiProperty()
  apy?: number;

  @ApiProperty()
  totalStakedCount!: number;

  @ApiProperty()
  totalStakedCountUsd!: number;

  @ApiProperty()
  totalRewardsPaid!: number;

  @ApiProperty()
  totalRewardsPaidUsd!: number;

  @ApiProperty()
  uniqueStakersCount!: number;

  @ApiProperty()
  instantUnstake!: string;

  @ApiProperty()
  instantPendingUnstake!: string;

  @ApiProperty()
  totalWithdrawn!: number;

  @ApiProperty()
  serviceFee!: number;
}

export class XoxnoInfo {
  @ApiProperty()
  price!: number;

  @ApiProperty()
  marketCap!: number;

  @ApiProperty()
  fdv!: number; // Fully Diluted Valuation

  @ApiProperty()
  tradeVol!: number; // Trade Volume

  @ApiProperty()
  supply!: number;

  @ApiProperty()
  burnedShort!: number;

  @ApiProperty()
  circulatingSupply!: number;

  @ApiProperty()
  holdersCount!: number;

  @ApiProperty()
  totalSupply!: number;

  @ApiProperty()
  idoPrice!: number; // Initial DEX Offering Price

  @ApiProperty({ type: Date })
  listingDate!: Date; // Assuming `listingDate` is a Date object
}
