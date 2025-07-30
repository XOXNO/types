import { ApiProperty } from '@nestjs/swagger';

export interface TokenValue {
  usdPrice: number;
  egldPrice: number;
}

export class ProtocolAprType {
  @ApiProperty({
    type: Number,
    description: 'Annual Percentage Rate',
    example: 5.25,
  })
  apr!: number;

  @ApiProperty({
    type: Number,
    description: 'Annual Percentage Yield',
    required: false,
    example: 5.38,
  })
  apy?: number;
}

export class RateType {
  @ApiProperty({
    type: Number,
    description: 'Exchange rate as decimal number',
    example: 1.05,
  })
  rateShort!: number;

  @ApiProperty({
    type: String,
    description: 'Exchange rate in smallest units as string',
    example: '1050000000000000000',
  })
  rate!: string;

  @ApiProperty({
    type: String,
    description: 'Reverse exchange rate in smallest units as string',
    example: '952380952380952380',
  })
  reverseRate!: string;

  @ApiProperty({
    type: Number,
    description: 'Reverse exchange rate as decimal number',
    example: 0.952,
  })
  reverseRateShort!: number;
}

export class EsdtTokenSummary {
  @ApiProperty({
    type: String,
    description: 'Total supply in smallest units as string',
    example: '1000000000000000000000',
  })
  supply!: string;

  @ApiProperty({
    type: String,
    description: 'Total minted amount in smallest units as string',
    example: '2000000000000000000000',
  })
  minted!: string;

  @ApiProperty({
    type: String,
    description: 'Total burned amount in smallest units as string',
    example: '1000000000000000000000',
  })
  burned!: string;

  @ApiProperty({
    type: String,
    description: 'Initial minted amount in smallest units as string',
    example: '1500000000000000000000',
  })
  initialMinted!: string;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the supply has been recomputed',
    example: true,
  })
  recomputedSupply!: boolean;

  @ApiProperty({
    type: Number,
    description: 'Total burned amount as decimal number',
    example: 1000.5,
  })
  burnedShort!: number;

  @ApiProperty({
    type: Number,
    description: 'Initial minted amount as decimal number',
    example: 1500.0,
  })
  initialMintedShort!: number;

  @ApiProperty({
    type: Number,
    description: 'Minted amount as decimal number',
    example: 2000.0,
  })
  minterShort!: number;

  @ApiProperty({
    type: Number,
    description: 'Total supply as decimal number',
    example: 1000.0,
  })
  supplyShort!: number;

  @ApiProperty({
    type: Number,
    description: 'Total number of token transfers',
    example: 15432,
  })
  transfersCount!: number;

  @ApiProperty({
    type: Number,
    description: 'Total number of token holders',
    example: 523,
  })
  holdersCount!: number;
}

export class IMetrics extends EsdtTokenSummary {
  @ApiProperty({ type: () => RateType })
  rateInfo!: RateType;

  @ApiProperty({
    type: Number,
    description: 'Annual Percentage Rate for staking',
    example: 12.5,
  })
  apr!: number;

  @ApiProperty({
    type: Number,
    description: 'Annual Percentage Yield for staking',
    required: false,
    example: 13.31,
  })
  apy?: number;

  @ApiProperty({
    type: Number,
    description: 'Total amount of tokens staked',
    example: 50000,
  })
  totalStakedCount!: number;

  @ApiProperty({
    type: Number,
    description: 'Total value of staked tokens in USD',
    example: 125000.5,
  })
  totalStakedCountUsd!: number;

  @ApiProperty({
    type: Number,
    description: 'Total rewards paid out to stakers',
    example: 5000,
  })
  totalRewardsPaid!: number;

  @ApiProperty({
    type: Number,
    description: 'Total rewards paid out in USD value',
    example: 12500.25,
  })
  totalRewardsPaidUsd!: number;

  @ApiProperty({
    type: Number,
    description: 'Number of unique staking addresses',
    example: 342,
  })
  uniqueStakersCount!: number;

  @ApiProperty({
    type: String,
    description: 'Amount available for instant unstaking',
    example: '10000000000000000000',
  })
  instantUnstake!: string;

  @ApiProperty({
    type: String,
    description: 'Amount pending for instant unstaking',
    example: '5000000000000000000',
  })
  instantPendingUnstake!: string;

  @ApiProperty({
    type: Number,
    description: 'Total amount withdrawn from staking',
    example: 2500,
  })
  totalWithdrawn!: number;

  @ApiProperty({
    type: Number,
    description: 'Service fee percentage',
    example: 2.5,
  })
  serviceFee!: number;
}

export class XoxnoInfo {
  @ApiProperty({
    type: Number,
    description: 'Current XOXNO token price in USD',
    example: 2.5,
  })
  price!: number;

  @ApiProperty({
    type: Number,
    description: 'Market capitalization in USD',
    example: 25000000,
  })
  marketCap!: number;

  @ApiProperty({
    type: Number,
    description: 'Fully Diluted Valuation in USD',
    example: 50000000,
  })
  fdv!: number; // Fully Diluted Valuation

  @ApiProperty({
    type: Number,
    description: '24h trading volume in USD',
    example: 1250000,
  })
  tradeVol!: number; // Trade Volume

  @ApiProperty({
    type: Number,
    description: 'Current circulating supply',
    example: 10000000,
  })
  supply!: number;

  @ApiProperty({
    type: Number,
    description: 'Total XOXNO tokens burned',
    example: 500000,
  })
  burnedShort!: number;

  @ApiProperty({
    type: Number,
    description: 'Tokens in circulation',
    example: 9500000,
  })
  circulatingSupply!: number;

  @ApiProperty({
    type: Number,
    description: 'Number of XOXNO token holders',
    example: 15234,
  })
  holdersCount!: number;

  @ApiProperty({
    type: Number,
    description: 'Maximum supply of XOXNO tokens',
    example: 20000000,
  })
  totalSupply!: number;

  @ApiProperty({
    type: Number,
    description: 'Initial DEX Offering price in USD',
    example: 0.5,
  })
  idoPrice!: number; // Initial DEX Offering Price

  @ApiProperty({ type: Date })
  listingDate!: Date; // Assuming `listingDate` is a Date object
}
