import { ApiProperty } from '@nestjs/swagger';

class UserTradingSummaryMin {
  @ApiProperty({
    description: 'Price of the NFT transaction',
    example: 5.5,
    type: Number,
  })
  price!: number;
  @ApiProperty({
    description: 'Transaction hash',
    example: '0xabcdef123456789',
    type: String,
  })
  txHash!: string;
  @ApiProperty({
    description: 'Unix timestamp of the transaction',
    example: 1672531200,
    type: Number,
  })
  timestamp!: number;
  @ApiProperty({
    description: 'NFT identifier',
    example: 'COOL-1a2b3c-01',
    type: String,
  })
  identifier!: string;
}

class UserTradingSummaryPrice {
  @ApiProperty({
    description: 'Average price value',
    example: 25.75,
    type: Number,
  })
  price!: number;
}

export class UserTradingSummary {
  @ApiProperty({
    description: 'Total number of trades',
    example: 150,
    type: Number,
  })
  count!: number;
  @ApiProperty({
    description: 'Total trading volume',
    example: 3862.5,
    type: Number,
  })
  volume!: number;
  @ApiProperty({
    description: 'Details of the minimum priced trade',
    type: UserTradingSummaryMin,
  })
  min!: UserTradingSummaryMin;
  @ApiProperty({
    description: 'Details of the maximum priced trade',
    type: UserTradingSummaryMin,
  })
  max!: UserTradingSummaryMin;
  @ApiProperty({
    description: 'Average price information',
    type: UserTradingSummaryPrice,
  })
  avg!: UserTradingSummaryPrice;
}

export type TradingSummaryActivityType = 'Purchase' | 'Sale';
